import React from 'react';
import { Typography, Switch } from '@mui/material';

type QuizzesSwitchProps = {
    editQuiz: boolean;
    setEditQuiz: (editQuiz: boolean) => void;
};

const EditQuizSwitch: React.FC<QuizzesSwitchProps> = ({ editQuiz, setEditQuiz }) => {
    const handleSwitchChange: React.ChangeEventHandler<HTMLInputElement> = (event) => {
        const isChecked = event.target.checked;
        setEditQuiz(isChecked);
    };

    return (
        <Switch
            checked={editQuiz}
            onChange={handleSwitchChange}
            value={
                <div>
                    <Typography color="blue-gray" className="font-medium">
                        Edit Quiz?
                    </Typography>
                    <Typography variant="caption" color="gray" className="font-normal">
                        You'll be able to edit quizzes for the lesson.
                    </Typography>
                </div>
            }
            // classes={className: ""}
        />
    );
};

export default EditQuizSwitch;
