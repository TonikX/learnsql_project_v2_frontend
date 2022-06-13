import * as React  from 'react';
import Grid from '@material-ui/core/Grid';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Checkbox from '@material-ui/core/Checkbox';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';

export default function TransferList({
  onChange, // вернет полный объект из options
  value, // массив выбранных options
  options, // id и title
}) {
    const [checked, setChecked] = React.useState([]);

    const left = React.useMemo(() => (
      options.filter((item) => !value?.find((valueItem) => valueItem.id === item.id))
    ), [options, value])

    const right = React.useMemo(() => (
        options.filter((item) => value?.find((valueItem) => valueItem.id === item.id))
    ), [options, value])

    const leftChecked = React.useMemo(() => left.filter(({ id })=> checked.includes(id)), [left, checked])
    const rightChecked = React.useMemo(() => right.filter(({ id })=> checked.includes(id)), [right, checked])

    const handleToggle = (value) => () => {
        const currentIndex = checked.indexOf(value);
        const newChecked = [...checked];

        if (currentIndex === -1) {
            newChecked.push(value);
        } else {
            newChecked.splice(currentIndex, 1);
        }

        setChecked(newChecked);
    };

    const handleAllRight = () => {
        onChange([
          ...right,
          ...left,
        ])
    };

    const handleCheckedRight = () => {
        onChange([
            ...value,
            ...leftChecked,
        ])
    };

    const handleCheckedLeft = () => {
        onChange(value.filter((item) => !rightChecked.find(rightCheckedItem => rightCheckedItem.id === item.id)))
    };

    const handleAllLeft = () => {
        onChange([])
    };

    const customList = (items) => (
        <Paper sx={{ width: 200, height: 230, overflow: 'auto' }}>
            <List dense component="div" role="list">
                {items.map(({ id, title }) => {
                    const labelId = `transfer-list-item-${id}-label`;

                    return (
                        <ListItem
                            key={id}
                            role="listitem"
                            button
                            onClick={handleToggle(id)}
                        >
                            <ListItemIcon>
                                <Checkbox
                                    checked={checked.indexOf(id) !== -1}
                                    tabIndex={-1}
                                    disableRipple
                                    inputProps={{
                                        'aria-labelledby': labelId,
                                    }}
                                />
                            </ListItemIcon>
                            <ListItemText id={labelId} primary={title} />
                        </ListItem>
                    );
                })}
                <ListItem />
            </List>
        </Paper>
    );

    return (
        <Grid container spacing={2} justifyContent="center" alignItems="center">
            <Grid item>{customList(left)}</Grid>
            <Grid item>
                <Grid container direction="column" alignItems="center">
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllRight}
                        disabled={left.length === 0}
                        aria-label="move all right"
                    >
                        ≫
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedRight}
                        disabled={leftChecked.length === 0}
                        aria-label="move selected right"
                    >
                        &gt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleCheckedLeft}
                        disabled={rightChecked.length === 0}
                        aria-label="move selected left"
                    >
                        &lt;
                    </Button>
                    <Button
                        sx={{ my: 0.5 }}
                        variant="outlined"
                        size="small"
                        onClick={handleAllLeft}
                        disabled={right.length === 0}
                        aria-label="move all left"
                    >
                        ≪
                    </Button>
                </Grid>
            </Grid>
            <Grid item>{customList(right)}</Grid>
        </Grid>
    );
}
