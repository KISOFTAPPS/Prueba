import { useState } from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { CardActionArea } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Stack from "@mui/material/Stack";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import Checkbox from "@mui/material/Checkbox";
import Button from "@mui/material/Button";
import toast, { Toaster } from "react-hot-toast";

const App = () => {
    // Definición del array inicial de items
    const itemsArray = [
        {
            sku: "313123",
            nombre: "nvidia 4090",
            precio_pu: 29999.99,
            cantidad: 103,
            completada: false,
            procesado: false,
        },
        {
            sku: "334222",
            nombre: "nvidia 4080",
            precio_pu: 25999.99,
            cantidad: 104,
            completada: false,
            procesado: false,
        },
        {
            sku: "676767",
            nombre: "nvidia 4070",
            precio_pu: 20999.99,
            cantidad: 143,
            completada: false,
            procesado: false,
        },
    ];

    // Declaración de un estado llamado "items" utilizando useState, con el valor inicial del array "itemsArray"
    const [items, setItems] = useState(itemsArray);

    // Filtra los items pendientes (no completados) del estado "items"
    let itemsPendientes = items.filter((item) => !item.completada);

    // Filtra los items completados pero no procesados del estado "items"
    let itemsCompletadas = items.filter((item) => item.completada && !item.procesado);

    // Función que formatea un número como una cadena de dinero en el formato "ES-MX"
    const formatoDinero = (numero) => {
        return new Intl.NumberFormat("ES-MX", {
            style: "currency",
            currency: "MXN",
        }).format(numero);
    };

    // Manejador de cambios del checkbox de un item, actualiza el estado "items" cambiando el valor de "completada" del item correspondiente
    const handleCheckboxChange = (sku) => {
        const updatedItems = items.map((item) => {
            if (item.sku === sku) {
                return {
                    ...item,
                    completada: !item.completada,
                };
            }
            return item;
        });

        setItems(updatedItems);
    };

    // Comprueba si todos los items están completados
    const completadas = () => {
        const allCompleted = items.every((item) => item.completada === true);

        if (allCompleted) {
            return true;
        } else {
            return false;
        }
    };

    // Manejador de cambios del procesado, muestra un mensaje de éxito y actualiza el estado "items" cambiando el valor de "procesado" de todos los items
    const handleProcessChange = () => {
        toast.success("Todo correcto");
        const updatedItems = items.map((item) => {
            return {
                ...item,
                procesado: !item.procesado,
            };
        });
        setItems(updatedItems);
    };

    // Manejador del botón de reseteo, muestra un mensaje de error y actualiza el estado "items" cambiando los valores de "completada" y "procesado" de todos los items
    const handleReset = () => {
        toast.error("La información regresó a su estado por defecto");
        const updatedItems = items.map((item) => {
            return {
                ...item,
                completada: !item.completada,
                procesado: !item.procesado,
            };
        });
        setItems(updatedItems);
    };

    return (
        <>
            <Toaster />
            <Stack direction="column" spacing={2}>
                <Button
                    variant="contained"
                    onClick={handleReset}
                    disabled={!(itemsPendientes.length === 0 && itemsCompletadas.length === 0)}
                >
                    VOLVER A REALIZAR LA PRUEBA
                </Button>
                <Card>
                    <CardActionArea>
                        <CardMedia
                            component="img"
                            height="140"
                            image="/assets/imgs/paqueteria.jpg"
                            alt="green iguana"
                        />
                        <CardContent>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Avatar alt="K" src="/assets/imgs/avatar.jpg" />
                                <Typography gutterBottom variant="h5">
                                    KISOFT
                                </Typography>
                            </Stack>
                            <Typography gutterBottom variant="h5" component="div">
                                KARIM IGNACIO SABAG OCHOA
                            </Typography>
                            <Stack direction="row" alignItems="center" spacing={2}>
                                <Typography gutterBottom variant="p">
                                    <span style={{ fontWeight: "bold" }}>Direccion:</span> Av.
                                    Ignacio Salazar 583I, Santa Isabel, 83130, Hermosillo, Son.
                                </Typography>
                            </Stack>
                            <Stack direction="row" justifyContent="space-between" spacing={2}>
                                <Typography gutterBottom variant="p">
                                    <span style={{ fontWeight: "bold" }}>Tel:</span> +52 1 662 499
                                    8279
                                </Typography>

                                <Stack direction="row" justifyContent="space-between" spacing={2}>
                                    <Typography gutterBottom variant="p">
                                        <span style={{ fontWeight: "bold" }}>Fecha:</span>{" "}
                                        10/07/2023
                                    </Typography>
                                    <Typography gutterBottom variant="p">
                                        <span style={{ fontWeight: "bold" }}>No. Guia:</span>{" "}
                                        1223213213213213
                                    </Typography>
                                </Stack>
                            </Stack>
                        </CardContent>
                    </CardActionArea>
                </Card>

                <div>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1a-content"
                            id="panel1a-header"
                        >
                            <Typography>Pendientes</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <TableContainer component={Paper}>
                                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell>SKU</TableCell>
                                            <TableCell align="center">NOMBRE DE PRODUCTO</TableCell>
                                            <TableCell align="center">PRECIO POR UNIDAD</TableCell>
                                            <TableCell align="center">CANTIDAD</TableCell>
                                            <TableCell align="center">TOTAL</TableCell>
                                            <TableCell align="center">¿Completada?</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {itemsPendientes.map((item) => (
                                            <TableRow key={item.sku}>
                                                <TableCell component="th" scope="row">
                                                    {item.sku}
                                                </TableCell>
                                                <TableCell align="center">{item.nombre}</TableCell>
                                                <TableCell align="center">
                                                    {formatoDinero(item.precio_pu)}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {item.cantidad}
                                                </TableCell>
                                                <TableCell align="center">
                                                    {formatoDinero(item.cantidad * item.precio_pu)}
                                                </TableCell>
                                                <TableCell align="center">
                                                    <Checkbox
                                                        color="primary"
                                                        checked={item.completada}
                                                        onChange={() =>
                                                            handleCheckboxChange(item.sku)
                                                        }
                                                    />
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </AccordionDetails>
                    </Accordion>
                    <Accordion>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2a-content"
                            id="panel2a-header"
                        >
                            <Typography>Completadas</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack direction="column" justifyContent="space-between" spacing={2}>
                                <TableContainer component={Paper}>
                                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                                        <TableHead>
                                            <TableRow>
                                                <TableCell>SKU</TableCell>
                                                <TableCell align="center">
                                                    NOMBRE DE PRODUCTO
                                                </TableCell>
                                                <TableCell align="center">
                                                    PRECIO POR UNIDAD
                                                </TableCell>
                                                <TableCell align="center">CANTIDAD</TableCell>
                                                <TableCell align="center">TOTAL</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {itemsCompletadas.map((item) => (
                                                <TableRow key={item.sku}>
                                                    <TableCell component="th" scope="row">
                                                        {item.sku}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.nombre}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {formatoDinero(item.precio_pu)}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {item.cantidad}
                                                    </TableCell>
                                                    <TableCell align="center">
                                                        {formatoDinero(
                                                            item.cantidad * item.precio_pu
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <Button
                                    variant="contained"
                                    onClick={handleProcessChange}
                                    disabled={!completadas() || itemsCompletadas.length <= 0}
                                >
                                    {completadas() && itemsCompletadas.length <= 0
                                        ? "Todo correcto"
                                        : "Procesar"}
                                </Button>
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                </div>
            </Stack>
        </>
    );
};

export default App;
