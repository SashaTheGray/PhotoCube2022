import { Box, Stack } from "@mui/material"
import { styled, Theme } from "@mui/system"
import { forwardRef } from "react"
import ModalUnstyled from "@mui/base/ModalUnstyled"
import clsx from "clsx"
import FilterTypes from "../../common/enums/filter-type-enums"
import { TransferList } from "./TransferList"

const BackdropUnstyled = forwardRef<
  HTMLDivElement,
  { open?: boolean; className: string }
>((props, ref) => {
  const { open, className, ...other } = props
  return (
    <div
      className={clsx({ "MuiBackdrop-open": open }, className)}
      ref={ref}
      {...other}
    />
  )
})

const Modal = styled(ModalUnstyled)`
  position: fixed;
  z-index: 1300;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const Backdrop = styled(BackdropUnstyled)`
  z-index: -1;
  position: fixed;
  right: 0;
  bottom: 0;
  top: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.5);
  -webkit-tap-highlight-color: transparent;
`

const ModalStyle = (theme: Theme) => ({
  width: 800,
  bgcolor: theme.palette.mode === "dark" ? "#0A1929" : "white",
  border: "2px solid currentColor",
  padding: "16px 32px 24px 32px",
})

interface FilterModalProps {
  modalState: boolean
  closeModal: () => void
  filterType: FilterTypes
}

export const FilterModal = ({
  modalState,
  closeModal,
  filterType,
}: FilterModalProps) => {
  return (
    <>
      <Modal
        aria-labelledby="unstyled-modal-title"
        aria-describedby="unstyled-modal-description"
        open={modalState}
        onClose={closeModal}
        components={{ Backdrop }}
      >
        <Box sx={ModalStyle}>
          <Stack alignItems="center" spacing={2}>
            <h1>{filterType}</h1>
            <TransferList filterType={filterType} />
          </Stack>
        </Box>
      </Modal>
    </>
  )
}
