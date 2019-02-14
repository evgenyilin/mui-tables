import Checkbox from '@material-ui/core/Checkbox';
import { Theme, WithStyles, withStyles } from '@material-ui/core/styles';
import TableCell from '@material-ui/core/TableCell';
import classNames from 'classnames';
import React from 'react';
import { Row } from '../../types';
import { useMUITableContext } from '../MUITable';

const defaultSelectCellStyles = (theme: Theme) => ({
    root: {
        [theme.breakpoints.down('sm')]: {
            display: 'none'
        }
    },
    fixedHeader: {
        position: 'sticky' as 'sticky',
        top: '0px',
        left: '0px',
        zIndex: 100,
        backgroundColor: theme.palette.background.paper,
        border: 'none',
        '&::after': {
            content: `""`,
            zIndex: 400,
            position: 'absolute' as 'absolute',
            bottom: 0,
            left: 0,
            width: '100%',
            borderBottom: `1px solid ${theme.palette.divider}`
        }
    },
    icon: {
        cursor: 'pointer',
        transition: 'transform 0.25s'
    },
    expanded: {
        transform: 'rotate(90deg)'
    },
    hide: {
        visibility: 'hidden' as 'hidden'
    },
    headerCell: {
        backgroundColor: theme.palette.background.paper
    },
    checkboxRoot: {
        '&$checked': {
            color: theme.palette.primary.main
        }
    },
    checked: {},
    disabled: {}
});

export interface MUITableSelectCellProps {
    checked: boolean;
    isHeaderCell: boolean;
    row?: Row<any>;
    testId?: string;
}

interface Props extends MUITableSelectCellProps, WithStyles<typeof defaultSelectCellStyles> {}

const TableSelectCell = (props: Props) => {
    const { classes, isHeaderCell, checked, row, testId } = props;
    const { options, toggleRowSelected, handleAllSelect } = useMUITableContext();
    const cellClass = classNames({
        [classes.root]: true,
        [classes.fixedHeader]: options.display.fixedHeader && isHeaderCell,
        [classes.headerCell]: isHeaderCell
    });
    const onChange = isHeaderCell
        ? handleAllSelect
        : () => {
              if (row) {
                  toggleRowSelected(row);
              }
          };
    return !options.rows.selectable ? null : (
        <TableCell className={cellClass} padding="checkbox">
            <div style={{ display: 'flex', alignItems: 'center' }}>
                <Checkbox
                    data-testid={testId}
                    classes={{
                        root: classes.checkboxRoot,
                        checked: classes.checked,
                        disabled: classes.disabled
                    }}
                    checked={checked}
                    onChange={onChange}
                />
            </div>
        </TableCell>
    );
};

export default withStyles(defaultSelectCellStyles, { name: 'MUIDataTableSelectCell' })(
    TableSelectCell
) as React.ComponentType<MUITableSelectCellProps>;
