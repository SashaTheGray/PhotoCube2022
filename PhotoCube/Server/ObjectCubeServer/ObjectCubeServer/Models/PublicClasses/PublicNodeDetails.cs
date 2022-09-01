namespace ObjectCubeServer.Models.PublicClasses
{
    public class PublicNodeDetails
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public int? ParentId { get; set; }
        
        public int TagId { get; set; }
        
        public int HierarchyId { get; set; }

        public PublicNodeDetails(int id, string tagName, int tagId, int hierarchyId)
        {
            Id = id;
            Name = tagName;
            TagId = tagId;
            HierarchyId = hierarchyId;
        }
    }
}
