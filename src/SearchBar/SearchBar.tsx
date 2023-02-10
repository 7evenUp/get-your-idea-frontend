import { useState } from "react";
import styles from "./SearchBar.module.css";
import SearchIcon from "@mui/icons-material/Search";
import { Backdrop, Chip, CircularProgress, IconButton } from "@mui/material";

const apiKey = "efe39b33-067d-4e85-89eb-4c23f4a3bf5c"; // https://api.wordassociations.net/

// stimulus — входными данными (параметр text) является слово-ответ. Сервис возвращает список слов-стимулов, которые чаще всего побуждают подумать о заданном слове-ответе;
// response — входными данными (параметр text) является слово-стимул. Сервис возвращает список ассоциативных слов-ответов, которые приходят на ум для заданного слова-стимула.

type Item = {
  item: string;
  weight: number;
  pos: "noun" | "verb";
};

const SearchBar = () => {
  const [inputText, setInputText] = useState("");
  const [backdropOpened, setBackdropOpened] = useState(false);
  const [resultItems1, setResultItems1] = useState<Item[]>([]);
  const [resultItems2, setResultItems2] = useState<Item[]>([]);

  const onButtonClick = async () => {
    setBackdropOpened(true);
    const res1 = await fetch(
      `https://api.wordassociations.net/associations/v1.0/json/search?apikey=${apiKey}&text=${inputText}&lang=ru&type=stimulus&limit=10&pos=noun,verb`
    );
    const data1 = await res1.json();
    const res2 = await fetch(
      `https://api.wordassociations.net/associations/v1.0/json/search?apikey=${apiKey}&text=${inputText}&lang=ru&type=response&limit=10&pos=noun,verb`
    );
    const data2 = await res2.json();
    setBackdropOpened(false);
    console.log(data1.response[0].items);
    setResultItems1(data1.response[0].items);
    setResultItems2(data2.response[0].items);
  };

  return (
    <div className={styles.searchBar}>
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={backdropOpened}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <label htmlFor="search">Just start typing here...</label>
      <div className={styles.inputWrapper}>
        <input
          id="search"
          name="search"
          className={styles.input}
          value={inputText}
          onChange={(val) => setInputText(val.currentTarget.value)}
          placeholder="Crypto trade, sell clothes, design shoes, e.t.c"
        />
        <IconButton
          onClick={onButtonClick}
          color="secondary"
          aria-label="search"
          size="large"
        >
          <SearchIcon fontSize="inherit" />
        </IconButton>
      </div>
      <h2>Stimulus</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          width: "50%",
        }}
      >
        {resultItems1.map((item, index) => {
          return (
            <Chip
              key={index}
              label={item.item}
              variant="filled"
              color="primary"
              onClick={() => console.log(item)}
            />
          );
        })}
      </div>
      <h2>Response</h2>
      <div
        style={{
          display: "flex",
          flexWrap: "wrap",
          gap: 16,
          width: "50%",
        }}
      >
        {resultItems2.map((item, index) => {
          return (
            <Chip
              key={index}
              label={item.item}
              variant="filled"
              color="primary"
              onClick={() => console.log(item)}
            />
          );
        })}
      </div>
    </div>
  );
};

export default SearchBar;
