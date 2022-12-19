import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Alert from "@mui/material/Alert";
import MenuItem from "@mui/material/MenuItem";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import Stack from "@mui/material/Stack";
import GameFinder from "../../apis/GameFinder";
import ListItemText from "@mui/material/ListItemText";
import { useEffect, useState } from "react";
import { useContext } from "react";
import { UsersContext } from "../../context/userContext";
import { Checkbox } from "@mui/material";

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 250,
    },
  },
};

export default function AddNewGame() {
  const { user } = useContext(UsersContext);
  const [date, setDate] = useState("");
  const [dbCats, setDbCats] = useState([]);
  const [plats, setPlats] = useState([]);
  const [devS, setDevS] = useState([]);
  const [pubS, setPubS] = useState([]);
  const [subS, setSubS] = useState([]);
  const [langs, setLangs] = useState([]);
  const [stores, setStores] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selCats, setSelCats] = useState([]);
  const [plat, setPlat] = useState("");
  const [dev, setDev] = useState("");
  const [pub, setPub] = useState("");
  const [sub, setSub] = useState("");
  const [lang, setLang] = useState("");
  const [store, setStore] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        await GameFinder.get("/categories").then((res) => {
          setDbCats(res.data.data.games);
        });
        await GameFinder.get("/platforms").then((res) => {
          setPlats(res.data.data.games);
        });
        await GameFinder.get("/developmentstudios").then((res) => {
          setDevS(res.data.data.games);
        });
        await GameFinder.get("/publishingstudios").then((res) => {
          setPubS(res.data.data.games);
        });
        await GameFinder.get("/subservice").then((res) => {
          setSubS(res.data.data.games);
        });
        await GameFinder.get("/languages").then((res) => {
          setLangs(res.data.data.games);
        });
        await GameFinder.get("/onlinestores").then((res) => {
          setStores(res.data.data.games);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    setLoading(false);
  }, [setDbCats, setPlats, setDevS, setPubS, setSubS, setLangs, setStores]);

  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  const handleCatChange = (e) => {
    const {
      target: { value },
    } = e;
    setSelCats(typeof value === "string" ? value.split(",") : value);
  };

  const content =
    user.role === "admin" ? (
      loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <Stack direction="row" spacing={11}>
            <Box>
              <InputLabel id="cat">Categories</InputLabel>
              <Select
                labelId="cat"
                id="cat"
                multiple
                value={selCats}
                onChange={handleCatChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {dbCats.map((cat) => (
                  <MenuItem key={cat.c_id} value={cat.category_name}>
                    <Checkbox
                      checked={selCats.indexOf(cat.category_name) > -1}
                    />
                    <ListItemText primary={cat.category_name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <InputLabel id="plat">Platforms</InputLabel>
              <Select
                labelId="plat"
                id="plat"
                value={plat}
                label="Platforms"
                onChange={(e) => setPlat(e.target.value)}
              >
                {plats.map((plat) => {
                  return (
                    <MenuItem key={plat.platform_id} value={plat.platform_name}>
                      {plat.platform_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
            <Box>
              <InputLabel id="ds">Development Studios</InputLabel>
              <Select
                labelId="ds"
                id="ds"
                value={dev}
                label="Development Studios"
                onChange={(e) => setDev(e.target.value)}
              >
                {devS.map((dev) => {
                  return (
                    <MenuItem key={dev.d_studio_id} value={dev.studio_name}>
                      {dev.studio_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
            <Box>
              <InputLabel id="ps">Publishing Studios</InputLabel>
              <Select
                labelId="ps"
                id="ps"
                value={pub}
                label="Publishing Studios"
                onChange={(e) => setPub(e.target.value)}
              >
                {pubS.map((pub) => {
                  return (
                    <MenuItem key={pub.p_studio_id} value={pub.studio_name}>
                      {pub.studio_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
            <Box>
              <InputLabel id="ss">Subscription Services</InputLabel>
              <Select
                labelId="ss"
                id="ss"
                value={sub}
                label="Subscription Services"
                onChange={(e) => setSub(e.target.value)}
              >
                {subS.map((sub) => {
                  return (
                    <MenuItem key={sub.service_id} value={sub.service_name}>
                      {sub.service_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
            <Box>
              <InputLabel id="lang">Languages</InputLabel>
              <Select
                labelId="lang"
                id="lang"
                value={lang}
                label="Languages"
                onChange={(e) => setLang(e.target.value)}
              >
                {langs.map((lan) => {
                  return (
                    <MenuItem key={lan.lang_id} value={lan.lang_name}>
                      {lan.lang_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
            <Box>
              <InputLabel id="store">Online Stores</InputLabel>
              <Select
                labelId="store"
                id="store"
                value={store}
                label="Online Stores"
                onChange={(e) => setStore(e.target.value)}
              >
                {stores.map((store) => {
                  return (
                    <MenuItem key={store.store_id} value={store.store_name}>
                      {store.store_name}
                    </MenuItem>
                  );
                })}
              </Select>
            </Box>
          </Stack>
          <Container maxWidth="sm">
            <Box
              sx={{
                mt: 2,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Typography variant="h6" component="h10">
                Game Name
              </Typography>
              <TextField fullwidth id="name" name="name" />
              <Typography variant="h6" component="h10" sx={{ mt: 2 }}>
                Release Date
              </Typography>
              <TextField
                fullwidth
                value={date}
                onChange={(e) => setDate(e.target.value)}
                id="date"
                type="date"
              />
              <Button onClick={handleSubmit} variant="contained" sx={{ mt: 2 }}>
                Burdayim
              </Button>
            </Box>
          </Container>
        </>
      )
    ) : null;
  return content;
}
