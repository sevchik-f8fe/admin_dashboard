import { TextField, Button, Box, InputAdornment } from "@mui/material";
import { useForm } from "react-hook-form";
import SearchIcon from '@mui/icons-material/Search';

import { useSearchField } from "./store";

const SearchField = ({ label, onSearch, onBreak }) => {
    const { value, setValue } = useSearchField();

    return (
        <>
            <Box
                sx={{
                    display: "flex",
                    gap: '.5rem'
                }}
            >
                <TextField
                    variant="outlined"
                    label={label}
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                    size="small"
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon sx={{ color: '#CCC5B9' }} />
                                </InputAdornment>
                            ),
                        },
                    }}
                />

                <Button
                    variant="text"
                    onClick={() => onSearch(value)}
                >Поиск</Button>
                <Button
                    variant="text"
                    onClick={() => {
                        onBreak();
                        setValue('');
                    }}
                >Сбросить</Button>
            </Box>
        </>
    );
}

export default SearchField;