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
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [mLink, setMLink] = useState("");
  const [syp, setSyp] = useState("");
  const [error, setError] = useState(null);

  const [dbCats, setDbCats] = useState([]);
  const [selCats, setSelCats] = useState([]);
  const [idCats, setIdCats] = useState([]);

  const [dbPlats, setDbPlats] = useState([]);
  const [selPlats, setSelPlats] = useState([]);
  const [idPlats, setIdPlats] = useState([]);

  const [dbDevS, setDbDevS] = useState([]);
  const [selDevS, setSelDevS] = useState([]);
  const [idDevS, setIdDevS] = useState([]);

  const [dbPubS, setDbPubS] = useState([]);
  const [selPubS, setSelPubS] = useState([]);
  const [idPubS, setIdPubS] = useState([]);

  const [dbSubS, setDbSubS] = useState([]);
  const [selSub, setSelSub] = useState([]);
  const [idSub, setIdSub] = useState([]);

  const [dbLang, setDbLang] = useState([]);
  const [selLang, setSelLang] = useState([]);
  const [idLang, setIdLang] = useState([]);

  const [dbStores, setDbStores] = useState([]);
  const [selStore, setSelStore] = useState([]);
  const [idStore, setIdStore] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        await GameFinder.get("/categories").then((res) => {
          setDbCats(res.data.data.games);
        });
        await GameFinder.get("/platforms").then((res) => {
          setDbPlats(res.data.data.games);
        });
        await GameFinder.get("/developmentstudios").then((res) => {
          setDbDevS(res.data.data.games);
        });
        await GameFinder.get("/publishingstudios").then((res) => {
          setDbPubS(res.data.data.games);
        });
        await GameFinder.get("/subservice").then((res) => {
          setDbSubS(res.data.data.games);
        });
        await GameFinder.get("/languages").then((res) => {
          setDbLang(res.data.data.games);
        });
        await GameFinder.get("/onlinestores").then((res) => {
          setDbStores(res.data.data.games);
        });
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
    setLoading(false);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    await GameFinder.post("/games", {
      game_name: name,
      release_date: date,
      merch_link: mLink,
      synopsis: syp,
      category: idCats,
      platform: idPlats,
      devs: idDevS,
      pubs: idPubS,
      subs: idSub,
      lang: idLang,
      store: idStore,
    });
  };

  const handleCatChange = (e, key) => {
    const {
      target: { value },
    } = e;
    setSelCats(typeof value === "string" ? value.split(",") : value);
    const orgKey = key.key.substr(2, key.key.length);
    setIdCats(typeof orgKey === "string" ? orgKey.split(",") : orgKey);
  };

  const handlePlatChange = (e, key) => {
    const {
      target: { value },
    } = e;
    setSelPlats(typeof value === "string" ? value.split(",") : value);
    const orgKey = key.key.substr(2, key.key.length);
    setIdPlats(typeof orgKey === "string" ? orgKey.split(",") : orgKey);
  };

  const handleDevChange = (e, key) => {
    const {
      target: { value },
    } = e;
    setSelDevS(typeof value === "string" ? value.split(",") : value);
    const orgKey = key.key.substr(2, key.key.length);
    setIdDevS(typeof orgKey === "string" ? orgKey.split(",") : orgKey);
  };

  const handlePubChange = (e, key) => {
    const {
      target: { value },
    } = e;
    setSelPubS(typeof value === "string" ? value.split(",") : value);
    const orgKey = key.key.substr(2, key.key.length);
    setIdPubS(typeof orgKey === "string" ? orgKey.split(",") : orgKey);
  };

  const handleSubChange = (e, key) => {
    const {
      target: { value },
    } = e;
    setSelSub(typeof value === "string" ? value.split(",") : value);
    const orgKey = key.key.substr(2, key.key.length);
    setIdSub(typeof orgKey === "string" ? orgKey.split(",") : orgKey);
  };

  const handleLangChange = (e, key) => {
    const {
      target: { value },
    } = e;
    setSelLang(typeof value === "string" ? value.split(",") : value);
    const orgKey = key.key.substr(2, key.key.length);
    setIdLang(typeof orgKey === "string" ? orgKey.split(",") : orgKey);
  };

  const handleStoreChange = (e, key) => {
    const {
      target: { value },
    } = e;
    setSelStore(typeof value === "string" ? value.split(",") : value);
    const orgKey = key.key.substr(2, key.key.length);
    setIdStore(typeof orgKey === "string" ? orgKey.split(",") : orgKey);
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
                multiple
                value={selPlats}
                onChange={handlePlatChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {dbPlats.map((plat) => (
                  <MenuItem key={plat.platform_id} value={plat.platform_name}>
                    <Checkbox
                      checked={selPlats.indexOf(plat.platform_name) > -1}
                    />
                    <ListItemText primary={plat.platform_name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <InputLabel id="ds">Development Studios</InputLabel>
              <Select
                labelId="ds"
                id="ds"
                multiple
                value={selDevS}
                onChange={handleDevChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {dbDevS.map((dev) => (
                  <MenuItem key={dev.d_studio_id} value={dev.studio_name}>
                    <Checkbox checked={selDevS.indexOf(dev.studio_name) > -1} />
                    <ListItemText primary={dev.studio_name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <InputLabel id="ps">Publishing Studios</InputLabel>
              <Select
                labelId="ps"
                id="ps"
                multiple
                value={selPubS}
                onChange={handlePubChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {dbPubS.map((pub) => (
                  <MenuItem key={pub.p_studio_id} value={pub.studio_name}>
                    <Checkbox checked={selPubS.indexOf(pub.studio_name) > -1} />
                    <ListItemText primary={pub.studio_name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <InputLabel id="ss">Subscription Services</InputLabel>
              <Select
                labelId="ss"
                id="ss"
                multiple
                value={selSub}
                onChange={handleSubChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {dbSubS.map((sub) => (
                  <MenuItem key={sub.service_id} value={sub.service_name}>
                    <Checkbox checked={selSub.indexOf(sub.service_name) > -1} />
                    <ListItemText primary={sub.service_name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <InputLabel id="lan">Languages</InputLabel>
              <Select
                labelId="lan"
                id="lan"
                multiple
                value={selLang}
                onChange={handleLangChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {dbLang.map((lang) => (
                  <MenuItem key={lang.lang_id} value={lang.lang_name}>
                    <Checkbox checked={selLang.indexOf(lang.lang_name) > -1} />
                    <ListItemText primary={lang.lang_name} />
                  </MenuItem>
                ))}
              </Select>
            </Box>
            <Box>
              <InputLabel id="os">Online Stores</InputLabel>
              <Select
                labelId="os"
                id="os"
                multiple
                value={selStore}
                onChange={handleStoreChange}
                renderValue={(selected) => selected.join(", ")}
                MenuProps={MenuProps}
              >
                {dbStores.map((store) => (
                  <MenuItem key={store.store_id} value={store.store_name}>
                    <Checkbox
                      checked={selStore.indexOf(store.store_name) > -1}
                    />
                    <ListItemText primary={store.store_name} />
                  </MenuItem>
                ))}
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
              <TextField
                fullwidth
                value={name}
                onChange={(e) => setName(e.currentTarget.value)}
                id="name"
                name="name"
              />
              <Typography variant="h6" component="h10">
                Merchandise Link
              </Typography>
              <TextField
                fullwidth
                value={mLink}
                onChange={(e) => setMLink(e.currentTarget.value)}
                id="mLink"
                name="mLink"
              />
              <Typography variant="h6" component="h10">
                Synopsis
              </Typography>
              <TextField
                fullwidth
                value={syp}
                onChange={(e) => setSyp(e.currentTarget.value)}
                id="syp"
                name="syp"
                multiline
                rows={4}
              />
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
