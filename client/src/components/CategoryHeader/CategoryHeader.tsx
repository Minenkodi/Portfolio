import {ToggleButtonGroup} from "@mui/material";
import {useState} from "react";
import {StyledToggleButton} from "./CategoryHeader.styled.ts";
import Button from "@mui/material/Button";

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
        <div className="category-header" style={{display: 'flex', justifyContent: 'start', 'alignItems': 'flex-end'}}>
            <ToggleButtonGroup
                color="standard"
                value={alignment}
                exclusive
                onChange={handleChange}
                aria-label="Categories Type"
                sx={{
                    border: 'none',
                    display: 'flex',
                    marginTop: '30px',
                    width: 'fit-content',
                    '& .MuiToggleButtonGroup-grouped': {
                        margin: 0,
                        border: '1px solid #E0E0E0',
                    }
                }}
            >
                <StyledToggleButton
                    value="Expenses"
                >Expenses</StyledToggleButton>
                <StyledToggleButton
                    value="Income"
                >Income</StyledToggleButton>
            </ToggleButtonGroup>
            <Button
                variant="contained"
                onClick={handleAddCategotyClick}
                sx={{
                    backgroundColor: '#4CAF50',
                    fontWeight: 600,
                    padding: '5px 10px',
                    maxHeight: 'fit-content',
                    borderRadius: '10px',
                    marginLeft: '15px',
                    marginBottom: '2px',
                    '&:hover': {
                        backgroundColor: '#2e7d32',
                        boxShadow: 6,
                    },
                }}
            >
                + Create Category
            </Button>
        </div>
    );
}

export default CategoryHeader;