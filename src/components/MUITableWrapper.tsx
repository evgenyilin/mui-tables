import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import Table from '@material-ui/core/Table';
import React from 'react';
import MUITableBody from './Body/MUITableBody';
import MUITableFooter from './Footer/MUITableFooter';
import MUITableHead from './Head/MUITableHead';
import { MUITableLoader } from './Head/MUITableLoader';
import { useMUITableContext } from './MUITable';
import MUITableFilterList from './Toolbars/Filters/MUITableFilterList';
import MUITableToolbar from './Toolbars/MUITableToolbar';
import MUITableToolbarSelect from './Toolbars/MUITableToolbarSelect';

const classes = {
    root: {},
    tableRoot: {
        outline: 'none',
        position: 'relative' as 'relative',
        width: '100%'
    },
    responsiveScroll: {
        overflowX: 'auto' as 'auto',
        overflow: 'auto' as 'auto',
        height: '100%',
        maxHeight: '499px'
    },
    caption: {
        position: 'absolute' as 'absolute',
        left: '-3000px'
    },
    liveAnnounce: {
        border: '0',
        clip: 'rect(0 0 0 0)',
        height: '1px',
        margin: '-1px',
        overflow: 'hidden',
        padding: '0',
        position: 'absolute' as 'absolute',
        width: '1px'
    },
    paper: {
        position: 'relative' as 'relative'
    },
    toolbarGrid: {
        position: 'relative' as 'relative'
    }
};

interface Props {
    loading: boolean;
}

const MUITableWrapper = (props: Props) => {
    const { loading } = props;
    const context = useMUITableContext();
    const { options, selectedRows } = context;
    const { title } = options;
    return (
        <Paper elevation={options.display.elevation} style={classes.paper}>
            <MUITableLoader loading={loading} />
            <Grid container spacing={0} style={classes.toolbarGrid}>
                <MUITableToolbar context={context} />
                {options.rows.selectBarTop && <MUITableToolbarSelect />}
            </Grid>
            <MUITableFilterList />
            <div
                data-testid="responsive-style-div"
                style={
                    options.display.responsive === 'scroll'
                        ? classes.responsiveScroll
                        : { position: 'relative' as 'relative' }
                }
            >
                <Table tabIndex={0} role={'grid'} style={classes.tableRoot}>
                    <caption style={classes.caption}>{title}</caption>
                    <MUITableHead />
                    <MUITableBody />
                </Table>
            </div>
            <MUITableFooter />
        </Paper>
    );
};
export default MUITableWrapper;
