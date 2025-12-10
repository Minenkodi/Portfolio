import {useState} from "react";
import {StyledButton, StyledToggleButton, StyledToggleButtonGroup} from "./CategoryHeader.styled.ts";
import {TEXT} from "../../constants/textConstants.ts";
import './CategoryHeader.scss';

function CategoryHeader() {
    const [alignment, setAlignment] = useState('Expenses');

    const handleChange = (
        _event: React.MouseEvent<HTMLElement>,
        newAlignment: string,
    ) => {
        setAlignment(newAlignment);
    };

    const handleAddCategotyClick = () => {
        console.log('Add Category Clicked');
    }

    return (
        <div className="category-header">
            <StyledToggleButtonGroup
                color="standard"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Categories Type"
            >
                <StyledToggleButton
                    value="Expenses"
                >Expenses</StyledToggleButton>
                <StyledToggleButton
                    value="Income"
                >Income</StyledToggleButton>
            </StyledToggleButtonGroup>
            <StyledButton
                variant="contained"
                onClick={handleAddCategotyClick}
            >
                {TEXT.BUTTONS.NEW_CATEGORY}
            </StyledButton>
        </div>
    );
}

export default CategoryHeader;