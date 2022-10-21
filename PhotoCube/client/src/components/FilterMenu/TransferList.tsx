import * as React from "react"
import Grid from "@mui/material/Grid"
import List from "@mui/material/List"
import Card from "@mui/material/Card"
import CardHeader from "@mui/material/CardHeader"
import ListItem from "@mui/material/ListItem"
import ListItemText from "@mui/material/ListItemText"
import ListItemIcon from "@mui/material/ListItemIcon"
import Checkbox from "@mui/material/Checkbox"
import Button from "@mui/material/Button"
import Divider from "@mui/material/Divider"
import TextField from "@mui/material/TextField"
import FilterTypes from "../../common/enums/filter-type-enums"
import {
  fetchTagFiltersByName,
  fetchTagsetFiltersByName,
  fetchHierarchyFiltersByName,
} from "../../common/requests"

// Helper functions.
function not(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) === -1)
}

function intersection(a: readonly number[], b: readonly number[]) {
  return a.filter((value) => b.indexOf(value) !== -1)
}

function union(a: readonly number[], b: readonly number[]) {
  return [...a, ...not(b, a)]
}

interface TransferListProps {
  filterType: FilterTypes
}

export const TransferList = ({ filterType }: TransferListProps) => {
  // Set states for both lists and checked items.
  const [checked, setChecked] = React.useState<number[]>([])
  const [left, setLeft] = React.useState<number[]>([0, 1, 2, 3])
  const [right, setRight] = React.useState<number[]>([4, 5, 6, 7])

  // Keep tracked of checked items in each list.
  const leftChecked = intersection(checked, left)
  const rightChecked = intersection(checked, right)

  // Toggle checked.
  const handleToggle = (value: number) => () => {
    const currentIndex = checked.indexOf(value)
    const newChecked = [...checked]

    // Check or uncheck.
    if (currentIndex === -1) newChecked.push(value)
    else newChecked.splice(currentIndex, 1)

    setChecked(newChecked)
  }

  const numberOfChecked = (items: number[]) =>
    intersection(checked, items).length

  const handleToggleAll = (items: number[]) => () => {
    if (numberOfChecked(items) === items.length) setChecked(not(checked, items))
    else setChecked(union(checked, items))
  }

  const handleCheckedRight = () => {
    setRight(right.concat(leftChecked))
    setLeft(not(left, leftChecked))
    setChecked(not(checked, leftChecked))
  }

  const handleCheckedLeft = () => {
    setLeft(left.concat(rightChecked))
    setRight(not(right, rightChecked))
    setChecked(not(checked, rightChecked))
  }

  const handleRequests = async (filterType: FilterTypes, name: string) => {
    if (name.length <= 2) return

    let response = null
    if (filterType === FilterTypes.TagFilter)
      response = await fetchTagFiltersByName(name)
    else if (filterType === FilterTypes.TagsetFilter)
      response = await fetchTagsetFiltersByName(name)
    else if (filterType === FilterTypes.HierarchyFilter)
      response = await fetchHierarchyFiltersByName(name)

    // TODO: Parse from response.
    console.log(response)
  }

  const customList = (title: React.ReactNode, items: number[]) => (
    <Card>
      <CardHeader
        sx={{ px: 2, py: 1 }}
        avatar={
          <Checkbox
            onClick={handleToggleAll(items)}
            checked={
              numberOfChecked(items) === items.length && items.length !== 0
            }
            indeterminate={
              numberOfChecked(items) !== items.length &&
              numberOfChecked(items) !== 0
            }
            disabled={items.length === 0}
            inputProps={{
              "aria-label": "all items selected",
            }}
          />
        }
        title={title}
        subheader={`${numberOfChecked(items)}/${items.length} selected`}
      />
      <Divider />
      <List
        sx={{
          width: 230,
          height: 250,
          bgcolor: "background.paper",
          overflow: "auto",
        }}
        dense
        component="div"
        role="list"
      >
        {items.map((value: number) => {
          const labelId = `transfer-list-all-item-${value}-label`

          return (
            <ListItem
              key={value}
              role="listitem"
              button
              onClick={handleToggle(value)}
            >
              <ListItemIcon>
                <Checkbox
                  checked={checked.indexOf(value) !== -1}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{
                    "aria-labelledby": labelId,
                  }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={`Filter ${value + 1}`} />
            </ListItem>
          )
        })}
        <ListItem />
      </List>
    </Card>
  )
  return (
    <>
      <TextField
        onInput={(e) => {
          const name = e.target as typeof e.target & { value: string }
          handleRequests(filterType, name.value)
        }}
        size="medium"
        placeholder={"Search for filters"}
      />
      <Grid container spacing={2} justifyContent="center" alignItems="center">
        <Grid item>{customList("Available", left)}</Grid>
        <Grid item>
          <Grid container direction="column" alignItems="center">
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
          </Grid>
        </Grid>
        <Grid item>{customList("Stored", right)}</Grid>
      </Grid>
    </>
  )
}