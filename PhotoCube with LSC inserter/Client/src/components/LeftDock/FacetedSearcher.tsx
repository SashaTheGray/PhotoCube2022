import React from 'react';
import Fetcher from '../Middle/ThreeBrowser/Fetcher';
import Tagset from '../Middle/ThreeBrowser/Tagset';
import '../../css/FacetedSearcher.css';
import TagBasedSearcher from './TagBasedSearcher';
import HierarchyBasedSearcher from './HierarchyBasedSearcher';

/**
 * An interface for Filter. Now only supports tagId filtering, but can be expanded.
 */
export interface Filter{
    type: string, //Can be either "hierarchy" or "tag"
    tagId: number,
    nodeId: number
}

/**
 * The FacetedSearcher component enables the user to use faceted search on the current browsing state with 
 * the ThreeBrowser. It is used in LeftDock. 
 */
export default class FacetedSearcher extends React.Component<{
    onFiltersChanged : (filters:Filter[]) => void,
    className: string
}>{
    hierarchyBasedSearcher = React.createRef<HierarchyBasedSearcher>();

    render(){
        return(
            <div id="FacetedSearcher" className={this.props.className}>
                <h4 className="Header">Faceted search</h4>
                <p>Toggle a checkbox to apply a filter:</p>
                <hr/>
                <HierarchyBasedSearcher ref={this.hierarchyBasedSearcher} className={this.props.className} onFiltersChanged={this.props.onFiltersChanged}/>
            </div>
        );
        //<button className="width100" onClick={e => this.onClearAllFilters(e)}>Clear all filters</button>
        //<TagBasedSearcher className={this.props.className} onFiltersChanged={this.props.onFiltersChanged}/>
    }

    /**
     * Used for clear filters button, not currently used...
     */
    private onClearAllFilters = (e: React.MouseEvent) => {
        if(this!.hierarchyBasedSearcher) { this.hierarchyBasedSearcher.current!.ClearFilters(); }
    }
}