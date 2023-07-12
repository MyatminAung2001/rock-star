import { useState } from "react";

const useFilter = (inititalFilter = "relevance", initailDropDrown = false) => {
    const [filterText, setFilterText] = useState<string>(inititalFilter);
    const [isDropDownOpen, setIsDropDownOpen] =
        useState<boolean>(initailDropDrown);

    const handleDropDown = () => {
        setIsDropDownOpen((prev) => !prev);
    };

    const handleFilter = (opt: string) => {
        setIsDropDownOpen((prev) => !prev);
        setFilterText(opt);
    };

    return {
        filterText,
        isDropDownOpen,
        handleDropDown,
        handleFilter,
    };
};

export default useFilter;
