import { useState } from "react"

export const useRowSelector = (items) => {
    const [checkedRows, setCheckedRow] = useState({})
    const [allRowsChecked, setAllRowsChecked] = useState(false)

    const toggleRowSelection = (id) => {
        setCheckedRow( prevState => ({
            ...prevState,
            [id]: !prevState[id]
        }))
    }

    const toggleAllRowsSelection = () => {

        if (!allRowsChecked) selectAllRows();
        else unselectAllRows();
        
        setAllRowsChecked(prevState => !allRowsChecked);
    }

    const selectAllRows = () => {
        const updatedCheckedRows = {};

        items?.map(row => {
            updatedCheckedRows[row.id] = true;
        });

        setCheckedRow(updatedCheckedRows);
    }

    const unselectAllRows = () => {
        const updatedCheckedRows = {};

        items?.map(row => {
            updatedCheckedRows[row.id] = false;
        });

        setCheckedRow(updatedCheckedRows);
    }

    return {
        checkedRows,
        allRowsChecked,
        toggleRowSelection,
        toggleAllRowsSelection
    };
}