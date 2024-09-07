import React, { useState } from "react";
import {
  Button,
  Container,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Slide,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import AirFlowSmartLogo from "./airFlowSmartLogo.svg";
import { calculateAbsoluteHumidity, calculateAverage } from "./calculation";
import { TransitionProps } from "@mui/material/transitions";

interface IValues {
  esternalTemperature?: number;
  esternalHumidity?: number;

  laundryTemperature?: number;
  laundryHumidity?: number;
  bathroomTemperature?: number;
  bathroomHumidity?: number;
  bedroomTemperature?: number;
  bedroomHumidity?: number;
  openSpaceTemperature?: number;
  openSpaceHumidity?: number;
}

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>
) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const App = () => {
  const [values, setValues] = useState<IValues>({});
  const [absoluteEsternalHumidity, setAbsoluteEsternalHumidity] = useState<number | undefined>();
  const [absoluteInternalHumidity, setAbsoluteInternalHumidity] = useState<number | undefined>();
  const [error, setError] = useState<string>("");
  const [openModal, setOpenModal] = useState<boolean>(false);

  const handleChange = (event: React.ChangeEvent<any>) => {
    let { name, value } = event.target;
    let updateValue = { [name]: parseFloat(value) };
    setValues({ ...values, ...updateValue });
  };
  console.log(values);
  const handleClickCalculate = () => {
    if (!values.esternalTemperature || !values.esternalHumidity) {
      setError("Settare parametri ambiente esterno");
    } else {
      let absoluteEsternalHumidity = calculateAbsoluteHumidity(values.esternalTemperature, values.esternalHumidity);
      setAbsoluteEsternalHumidity(absoluteEsternalHumidity);

      let arrAbsoluteInternalHumidity = [];

      if (values.laundryTemperature && values.laundryHumidity) {
        let absoluteInternalHumidityLaundry = calculateAbsoluteHumidity(
          values.laundryTemperature,
          values.laundryHumidity
        );
        arrAbsoluteInternalHumidity.push(absoluteInternalHumidityLaundry);
      }
      if (values.bathroomTemperature && values.bathroomHumidity) {
        let absoluteInternalHumidityBathroom = calculateAbsoluteHumidity(
          values.bathroomTemperature,
          values.bathroomHumidity
        );
        arrAbsoluteInternalHumidity.push(absoluteInternalHumidityBathroom);
      }
      if (values.bedroomTemperature && values.bedroomHumidity) {
        let absoluteInternalHumidityBedroom = calculateAbsoluteHumidity(
          values.bedroomTemperature,
          values.bedroomHumidity
        );
        arrAbsoluteInternalHumidity.push(absoluteInternalHumidityBedroom);
      }
      if (values.openSpaceTemperature && values.openSpaceHumidity) {
        let absoluteInternalHumidityOpenSpace = calculateAbsoluteHumidity(
          values.openSpaceTemperature,
          values.openSpaceHumidity
        );
        arrAbsoluteInternalHumidity.push(absoluteInternalHumidityOpenSpace);
      }

      let averageAbsoluteInternalHumidity = calculateAverage(arrAbsoluteInternalHumidity);
      setAbsoluteInternalHumidity(averageAbsoluteInternalHumidity);

      setError("");
      handleClickOpen();
    }
  };

  const handleClickOpen = () => {
    setOpenModal(true);
  };

  const handleClose = () => {
    setOpenModal(false);
  };

  console.log(values);

  return (
    <>
      <header>
        <Stack
          style={{ background: "#9beffa", border: "1px solid #0B5567", padding: "0 10px" }}
          alignItems={"center"}
          height={50}
          direction={"row"}
          justifyContent={"space-between"}
        >
          <Typography color="#0B5567">AirFlow Smart</Typography>
          <img width={30} height={40} src={AirFlowSmartLogo} alt="Logo app" />
        </Stack>
      </header>
      <Container maxWidth="sm">
        <Stack direction={"column"}>
          <Stack padding={2} style={{ borderBottom: "1px solid #0B5567" }} flexGrow={1} gap={2}>
            <Typography>Ambiente esterno</Typography>
            <TextField
              id="esternalTemperature"
              label="Temperatura °C"
              name={"esternalTemperature"}
              type="number"
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
            <TextField
              id="esternalHumidity"
              label="Umidità %"
              type="number"
              name={"esternalHumidity"}
              onChange={handleChange}
              slotProps={{
                inputLabel: {
                  shrink: true,
                },
              }}
            />
          </Stack>
          <Stack direction={"row"} gap={2}>
            <Stack padding={2} flexGrow={1} gap={2}>
              <Typography>Lavanderia</Typography>
              <TextField
                id="laundryTemperature"
                label="Temperatura °C"
                type="number"
                name={"laundryTemperature"}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                id="laundryHumidity"
                label="Umidità %"
                type="number"
                name={"laundryHumidity"}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Stack>
            <Stack padding={2} flexGrow={1} gap={2}>
              <Typography>Bagnetto</Typography>
              <TextField
                id="bathroomTemperature"
                label="Temperatura °C"
                name={"bathroomTemperature"}
                onChange={handleChange}
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                id="bathroomHumidity"
                label="Umidità %"
                type="number"
                name={"bathroomHumidity"}
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack direction={"row"} gap={2}>
            <Stack padding={2} flexGrow={1} gap={2}>
              <Typography>Camera</Typography>
              <TextField
                id="bedroomTemperature"
                label="Temperatura °C"
                onChange={handleChange}
                name={"bedroomTemperature"}
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                id="bedroomHumidity"
                label="Umidità %"
                onChange={handleChange}
                name={"bedroomHumidity"}
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Stack>
            <Stack padding={2} flexGrow={1} gap={2}>
              <Typography>OpenSpace</Typography>
              <TextField
                id="openSpaceTemperature"
                onChange={handleChange}
                label="Temperatura °C"
                name={"openSpaceTemperature"}
                type="number"
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
              <TextField
                id="openSpaceHumidity"
                label="Umidità %"
                name={"openSpaceHumidity"}
                type="number"
                onChange={handleChange}
                slotProps={{
                  inputLabel: {
                    shrink: true,
                  },
                }}
              />
            </Stack>
          </Stack>
          <Stack padding={2} direction={"column"}>
            <Button variant="contained" onClick={handleClickCalculate}>
              Calcola
            </Button>
            <Stack color={"red"}>{error}</Stack>
          </Stack>
        </Stack>
      </Container>
      <footer>
        <Stack style={{ position: "absolute", bottom: 0, right: 0 }}>by danielefocarelli</Stack>
      </footer>
      <Dialog
        open={openModal}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{"Risultati"}</DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-slide-description">
            <Stack direction={"column"} gap={2}>
              <Typography>
                Umidità assoluta esterna: <b>{absoluteEsternalHumidity}</b> g/m³
              </Typography>
              <Typography>
                Umidità assoluta interna: <b>{absoluteInternalHumidity}</b> g/m³
              </Typography>
              {absoluteInternalHumidity! > absoluteEsternalHumidity! ? (
                <Typography style={{ color: "green" }}>Apri le finestre!</Typography>
              ) : (
                <Typography style={{ color: "red" }}>
                  <b>NON</b> Aprire le finestre!
                </Typography>
              )}
            </Stack>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" onClick={handleClose}>
            Chiudi
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default App;
