import { useState } from "react";

const useFilter = (inititalFilter = "relevance", initailDropDrown = false) => {
    const [filterText, setFilterText] = useState(inititalFilter);
    const [isDropDownOpen, setIsDropDownOpen] = useState(initailDropDrown);

    const handleDropDown = () => {
        setIsDropDownOpen((prev) => !prev);
    };

    const handleFilter = (e) => {
        setIsDropDownOpen((prev) => !prev);
        setFilterText(e.target.value);
    };

    return {
        filterText,
        isDropDownOpen,
        handleDropDown,
        handleFilter,
    };
};

export default useFilter;
