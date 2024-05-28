import React from 'react';
import { Typography, Switch, FormControlLabel } from '@mui/material';

type QuizzesSwitchProps = {
    addQuiz: boolean;
    setAddQuiz: (addQuiz: boolean) => void;
};

const QuizSwitch: React.FC<QuizzesSwitchProps> = ({ addQuiz, setAddQuiz }) => {
    const handleSwitchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const isChecked = event.target.checked;
        setAddQuiz(isChecked);
    };

    return (
        <FormControlLabel
            control={<Switch checked={addQuiz} onChange={handleSwitchChange} />}
            label={
                <div>
                    <Typography color="primary" variant="body1">
                        Add Quiz?
                    </Typography>
                    <Typography variant="caption" color="textSecondary">
                        You'll be able to add quizzes for the lesson.
                    </Typography>
                </div>
            }
            sx={{
                mt: -2.5,
            }}
        />
    );
};

export default QuizSwitch;
