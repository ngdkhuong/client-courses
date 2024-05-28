import { Fragment, useState } from 'react';
import { Dialog, DialogContent, DialogActions } from '@mui/material';
import { HashLoader } from 'react-spinners';

interface SpinnerDialogProps {
    isUploading: boolean;
}

const SpinnerDialog: React.FC<SpinnerDialogProps> = ({ isUploading }) => {
    const [size, setSize] = useState(null);
    const [isOpen, setIsOpen] = useState(isUploading);

    const handleOpen = (value: any) => setSize(value);

    return (
        <Fragment>
            <Dialog open={isUploading} maxWidth={'sm'} onClose={handleOpen}>
                <DialogContent>
                    <div className="flex mt-5 justify-center items-center">
                        <HashLoader size={100} color="gray" loading={isUploading} />
                    </div>
                </DialogContent>
                <DialogActions className="mb-7 flex justify-center font-semibold">
                    Your files are being uploaded. Please wait...
                </DialogActions>
            </Dialog>
        </Fragment>
    );
};

export default SpinnerDialog;
