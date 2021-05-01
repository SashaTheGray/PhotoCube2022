import java.io.BufferedReader;
import java.io.BufferedWriter;
import java.io.File;
import java.io.FileNotFoundException;
import java.io.FileReader;
import java.io.FileWriter;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.HashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

import com.google.gson.*;

/**
 * HierarchyGenerator keeps track of all the hierarchies and tagsets for semantic tags, derived from the ImageNet Shuffle and WordNet.
 */
public class JsonHierarchyGenerator {
    private static final String outputPath = FilepathReader.LSCHierarchiesOutput;
    private static final String jsonFile = FilepathReader.JsonHierarchy;
    private Gson g;
    private JSTagset root;
    private Map<String, String> tag_tagset_map; // fx. Alex - People, cat - animal. Note the value is top tagset name. No "_" in the tagName.
    private Map<String, List<JSTagset>> tagName_duplicateTagsetList_map; // fx. (white, < white-person, white-color ...>) as an entry. No "_" in the tagName.
    private Set<String> homonyms; // If there were more than 1 entry in tagName_duplicateTagsetList_map, we put the tagname here to check if it had duplicates. 'white', not 'white(id)'. No "_" in the tagName.

    public JsonHierarchyGenerator() throws FileNotFoundException {
        BufferedReader br = new BufferedReader(new FileReader(new File(jsonFile)));
        this.g = new Gson();
        this.root = g.fromJson(br, JSTagset.class);
        this.tagName_duplicateTagsetList_map = new HashMap<>();
        System.out.println("Started building tagname - List<JSTagset> map.");
        buildTagNameDuplicateTagsetListMapRecursive(root);
        this.homonyms = new HashSet<>();
        changeTagNameOfHomonyms();
        this.tag_tagset_map = new HashMap<>();
        buildTagTagsetMap();
    }

    private void buildTagNameDuplicateTagsetListMapRecursive(JSTagset current) {
        // traverse root tree and put each JStagsets into tagname-tagsetList map
        String tagsetName = current.getName().replaceAll("_", " ");
        putInTagNameDuplicateTagsetListMap(tagsetName, current);
        if (current.getChildren() != null) {
            for (JSTagset child : current.getChildren()) {
                buildTagNameDuplicateTagsetListMapRecursive(child);
            }
        }
    }

    private void putInTagNameDuplicateTagsetListMap(String tagsetName, JSTagset current) {
        List<JSTagset> tagsets = (this.tagName_duplicateTagsetList_map.containsKey(tagsetName)) ? tagName_duplicateTagsetList_map.get(tagsetName) : new ArrayList<>();
        tagsets.add(current);
        tagName_duplicateTagsetList_map.put(tagsetName, tagsets);
    }

    private void changeTagNameOfHomonyms() {
        System.out.println("Started making duplicate tag names unique, by concatenating id to the name.");
        for (String tagName : tagName_duplicateTagsetList_map.keySet()) {
            List<JSTagset> tagsets = tagName_duplicateTagsetList_map.get(tagName);
            if (tagsets.size() > 1) { // More than 1 tagsets for a tagname means there are semantic duplicates (homonyms).
                homonyms.add(tagName);
                for (JSTagset jsTagset : tagsets) {
                    String newName = jsTagset.getName() + "(" + jsTagset.getId() + ")";
                    jsTagset.setName(newName); // now the tagset name is name(id)
                }
            }
        }
    }

    /**
     * Returns the homonyms set. (The tag that had more than 2 meanings.)
     * @return the homonyms set
     */
    public Set<String> getHomonyms() {
        return this.homonyms;
    }

    /**
     * Returns the tag_tagset_map.
     * Entry examples: (Alex, People) (Cat, Animal)
     * Note that the value is top tagset name.
     * @return the tag_tagset_map
     */
    public Map<String, String> getTag_tagset_map() {
        if (tag_tagset_map.isEmpty()) {
            buildTagTagsetMap();
        }
        return tag_tagset_map;
    }

    private void buildTagTagsetMap() {
        String tagsetName = this.root.getName().replaceAll("_", " ");
        buildTagTagsetMapRecursive(tagsetName, this.root);
    }

    private void buildTagTagsetMapRecursive(String tagsetName, JSTagset current) {
        this.tag_tagset_map.put(current.getName().replaceAll("_", " "), tagsetName);
        if (current.getChildren() != null) {
            for (JSTagset child : current.getChildren()) {
                buildTagTagsetMapRecursive(tagsetName, child);
            }
        }
    }

    /**
     * Returns all the hierarchy information of all tagsets WordNet Hierarchy json file (hierarchy.1.0.json).
     * Format: TagsetName,,HierarchyName,,ParrentTagName,,ChildTag,,ChildTag,,ChildTag,,(...)\n
     */
    public String buildHierarchyString() {
        // We decided to have "entity" as a tagset/rootNode of all tags.
        Set<String> hierarchyStrings = new HashSet<>();
        buildHierarchyStringRecursive(hierarchyStrings, this.root.getName().replaceAll("_", " "), this.root);
        StringBuilder sb = new StringBuilder();
        for (String hierarchyString : hierarchyStrings) {
            sb.append(hierarchyString);
        }
        return sb.toString();
    }

    private void buildHierarchyStringRecursive(Set<String> hierarchyStrings, String tagsetName, JSTagset current) {
        if (current.getChildren() != null) {
            String hierarchyString = current.getHierarchyString(tagsetName);
            hierarchyStrings.add(hierarchyString);
            for (JSTagset child : current.getChildren()) {
                buildHierarchyStringRecursive(hierarchyStrings, tagsetName, child);
            }
        }
    }

    /**
     * Writes the hierarchy information in the WordNet Hierarchy to a file.
     * The path to output file is to specified in config.properties file.
     */
    public void writeToHierarchyFile() {
        System.out.println("Started writing json tags (visual concepts) into the hierarchy file.");
            try {
                BufferedWriter writer = new BufferedWriter(new FileWriter(outputPath, true));
                writer.write(buildHierarchyString());
                writer.close();
            } catch (IOException e) {
                e.printStackTrace();
            }
    }

    public static void main(String[] args) throws IOException {
        JsonHierarchyGenerator jshg = new JsonHierarchyGenerator();
        // BufferedWriter writer = new BufferedWriter(new FileWriter("C:\\lsc2020\\tags-and-hierarchies\\duplicatesFromJson.txt"));
        // writer.write(jshg.findNumDuplicateTags());
        // writer.close();
        // BufferedReader br = new BufferedReader(new FileReader(new File("C:\\lsc2020\\tags-and-hierarchies\\jsonexample.json")));
        // Gson g = new Gson();
        // JSTagset drink = g.fromJson(br, JSTagset.class);
        // for (JSTagset child : drink.getChildren()) {
        //     System.out.println(child.getName());
        // }
        // System.out.println(drink.getHierarchyString("drink"));
        System.out.println(jshg.buildHierarchyString());
        // for (JSTagset child : jshg.root.getChildren()) {
        //     System.out.println(child.getName());
        // }
        // jshg.writeToHierarchyFile();

        // Map<String, String> tag_tagset_map = jshg.getTag_tagset_map();
        // tag_tagset_map.forEach((k,v) -> System.out.println(k + " : " + v));
    }
}
