import { formatTime } from '@/utils/timeFormat';
import { Button, Typography } from '@mui/material';

const options = [2, 15, 30, 45, 60, 120];

export default function Options(props: {
    selected: number;
    onSelected: (seconds: number) => void;
}) {
    return (
        <div style={{ width: '100%' }}>
            <div
                style={{
                    display: 'flex',
                    flexDirection: 'row',
                    alignItems: 'center',
                    maxWidth: '100%',
                    overflow: 'auto',
                    gap: '8px',
                    width: '100%',
                    flexWrap: 'wrap',
                    justifyContent: 'center',
                }}
            >
                {options.map((seconds) => (
                    <OptionItem
                        selected={props.selected}
                        key={seconds}
                        seconds={seconds}
                        onClick={() => props.onSelected(seconds)}
                    />
                ))}
            </div>
        </div>
    );
}

interface Props {
    seconds: number;
    onClick: () => void;
    selected: number;
}

function OptionItem(props: Props) {
    return (
        <Button
            color='primary'
            onClick={props.onClick}
            variant={props.selected === props.seconds ? 'contained' : 'outlined'}
            sx={{ minWidth: '100px', zIndex: 2 }}
        >
            <Typography
                sx={{
                    fontSize: '1.5rem',
                    textTransform: 'none',
                    fontWeight: 700,
                }}
            >
                {formatTime(props.seconds)}
            </Typography>
        </Button>
    );
}
