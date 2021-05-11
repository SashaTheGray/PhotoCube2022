import React, { useEffect, useState } from 'react';
import { Filter } from '../../Filter';
import Fetcher from '../ThreeBrowser/Fetcher';
import Tagset from '../ThreeBrowser/Tagset';
import Dropdown, { Option } from 'react-dropdown';
import 'react-dropdown/style.css';

export const TagsetDropdown = (props: {onFiltersChanged: (filter: Filter) => void, activeFilters: Filter[]}) => {

    const [options, setDropdownOptions] = useState<Option[]>([]);
    const [selected, setChoice] = useState<Tagset | null>(null);
    const [buttonDisabled, disableButton] = useState<boolean>(false);

    useEffect(() =>  {
        fetchTagsets(); 
    }, []);

    async function fetchTagsets () {
        const response = await Fetcher.FetchTagsets();
        const tagsets = response.map((ts: Tagset) => {return {Id: ts.Id, Name: ts.Name }});
        setDropdownOptions(tagsets.map((ts: Tagset) => {return {value: ts.Id.toString(), label: ts.Name}}));
    }

    const addFilter = () => {
        const filter: Filter = {
            Id: selected!.Id,
            type: "tagset",
            name: selected!.Name 
        }
        if (!props.activeFilters.some(af => af.name === filter.name)) {
            props.onFiltersChanged(filter);
            disableButton(true);
        }
    }

    const updateDropdown = (e: Option) => {
        setChoice({Id: parseInt(e.value), Name: e.label!.toString(), Tags: null});
        disableButton(props.activeFilters.some(af => af.name == e.label!.toString()));
    }

    return (
        <div className="tagset dropdown">
            <Dropdown options={options} placeholder="Select a tagset" onChange={e => updateDropdown(e)}/>
            <button disabled={buttonDisabled} onClick={() => addFilter()}>Add Filter</button>
        </div>
    )
}