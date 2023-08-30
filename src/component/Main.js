import React, { useState } from "react";
import myImage from "./image1.png";

export default function Main() {
  const languages = {
    en: "English",
    ar: "Arabic",
    as: "Assamese",
    bn: "Bangla",
    bg: "Bulgarian",
    ca: "Catalan",
    zh: "Chinese ",
    hr: "Croatian",
    cs: "Czech",
    da: "Danish",
    nl: "Dutch",
    fil: "Filipino",
    fi: "Finnish",
    de: "German",
    el: "Greek",
    gu: "Gujarati",
    ht: "Haitian ",
    he: "Hebrew",
    hi: "Hindi",
    hu: "Hungarian",
    id: "Indonesian",
    it: "Italian",
    ja: "Japanese",
    kn: "Kannada",
    kk: "Kazakh",
    ko: "Korean",
    lt: "Lithuanian",
    mg: "Malagasy",
    ms: "Malay",
    ml: "Malayalam",
    mr: "Marathi",
    nb: "Norwegian",
    or: "Odia",
    ps: "Pashto",
    fa: "Persian",
    pl: "Polish",
    pa: "Punjabi",
    ro: "Romanian",
    ru: "Russian",
    sk: "Slovak",
    sl: "Slovenian",
    es: "Spanish",
    sw: "Swahili",
    sv: "Swedish",
    ta: "Tamil",
    te: "Telugu",
    th: "Thai",
    tr: "Turkish",
    uk: "Ukrainian",
    ur: "Urdu",
    vi: "Vietnamese",
  };

  //   options select
  const [selected, setSelected] = useState(" ");

  // TextArea value
  const [textareaValue, setTextareaValue] = useState(" ");

  //   key selected in select language
  const [selectedKey, setSelectedKey] = useState("");

  //   Loading

  const [loading, setLoading] = useState(false);

  //  text area change event handler
  const handleTextchange = (event) => {
    setTextareaValue(event.target.value);
  };

  //   Select Change Event Handler
  const workmodechage = (event) => {
    setSelected(event.target.value);
  };

  //   Languages Dropdown list
  const handleSelectChange = (event) => {
    setSelectedKey(event.target.value);
  };

  //   button to start paraphrasing

  const startParaphrase = async () => {
    setLoading(true);
    await languageTranslate();

    // for paraphase

    switch (selected) {
      case "upper":
        setTextareaValue(textareaValue.toUpperCase());
        break;
      case "lower":
        setTextareaValue(textareaValue.toLowerCase());
        break;

      case "Summarizer":
        //Summarizer
        try {
          await summarizer();
        } catch (error) {
          console.error(error);
        }
        break;

      case "Removes":
        let newText = textareaValue.split(/[ ] + /);
        setTextareaValue(newText.join(" "));
        break;

      default:
    }
    setLoading(false);
  };

  // Language change API

  const languageTranslate = async () => {
    const url =
      "https://google-translate113.p.rapidapi.com/api/v1/translator/text";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/x-www-form-urlencoded",
        "X-RapidAPI-Key": "573de858b8mshf2e7158c7259a3dp1a380ejsnca09818e914f",
        "X-RapidAPI-Host": "google-translate113.p.rapidapi.com",
      },
      body: new URLSearchParams({
        from: "en",
        to: `${selectedKey}`,
        text: `${textareaValue}`,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const parsedResult = JSON.parse(result);
      const translated = parsedResult.trans;

      setTextareaValue(translated);
    } catch (error) {
      console.error(error);
    }
  };

  const trash = () => {
    setTextareaValue("");
  };

  const copy = async () => {
    await navigator.clipboard.writeText(textareaValue);
  };

  // summarizer api

  const summarizer = async () => {
    const url = "https://open-ai21.p.rapidapi.com/summary";
    const options = {
      method: "POST",
      headers: {
        "content-type": "application/json",
        "X-RapidAPI-Key": "573de858b8mshf2e7158c7259a3dp1a380ejsnca09818e914f",
        "X-RapidAPI-Host": "open-ai21.p.rapidapi.com",
      },
      body: JSON.stringify({
        text: `${textareaValue}`,
      }),
    };

    try {
      const response = await fetch(url, options);
      const result = await response.text();
      const parsedResult = JSON.parse(result);
      const translated = parsedResult.result;
      console.log(translated);
      setTextareaValue(translated);
    } catch (error) {
      console.error(error);
    }
  };
  const speak = () => {
    let msg = new SpeechSynthesisUtterance();
    msg.text = textareaValue;
    window.speechSynthesis.speak(msg);
  };

  return (
    <>
      <div className="container-fluid ">
        <a className="navbar-brand container" href="#">
          <img
            src={myImage}
            alt="Logo"
            width="190"
            height="60"
            className=" d-inline-block align-text-top"
            id="logo_image"
          />
        </a>

        {/* dropdown */}

        <div className="d-flex justify-content-between ">
          <div className="text">
            <p>Choose mode</p>
            <select
              id="select1"
              value={selected}
              onChange={workmodechage}
              style={{ width: "140px" }}
            >
              <option value="">Free rewriter</option>
              <option value="Summarizer">Summarize</option>
              <option value="upper">Uppercase</option>
              <option value="lower">LowerCase</option>
              <option value="Removes">Space Remove</option>
            </select>
          </div>

          {/* Language dropdown */}

          <div className="text">
            <p>Choose language </p>
            <select
              id="select2"
              style={{ width: "120px" }}
              onChange={handleSelectChange}
              value={selectedKey}
            >
              {Object.keys(languages).map((languageCode) => (
                <option key={languageCode} value={languageCode}>
                  {languages[languageCode]}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Textarea */}

        <div className="d-flex flex-column mb-3  " id="boxx">
          <div className="p-2">
            <textarea
              name=""
              id="input-box"
              cols="30"
              rows="15"
              className="text-box border-0  outline-0  "
              value={textareaValue}
              onChange={handleTextchange}
              style={{
                height: "305px",
                width: "320px",
                resize: "none",
                padding: "12px",
                borderRadius: "10px 10px 0  0",
              }}
              //   disabled={loading}
            ></textarea>
          </div>
          <div
            className="p-0"
            id="icons"
            style={{
              width: "320px",
              height: "35px",
              borderRadius: "0px 0px 10px  10px",
            }}
          >
            {/* word count area */}

            <div className="d-flex justify-content-between p-1">
              <div className="wordss">
                <i id="wordsCount">
                  Words :{" "}
                  {/* {textareaValue.trim().split(/\s+/).filter(Boolean).length} */}
                  {
                    String(textareaValue).trim().split(/\s+/).filter(Boolean)
                      .length
                  }
                </i>
              </div>

              {/* icons */}

              <div className="icons_speak ">
                <i className="fa fa-volume-low" onClick={speak}></i>
                <i className="fa-regular fa-copy" onClick={copy}></i>
                <i className="fa-solid fa-trash-can" onClick={trash}></i>
              </div>
            </div>
          </div>
        </div>

        {/* button */}

        <button
          type="button"
          className="btn container"
          id="Change-button"
          onClick={startParaphrase}
        >
          {loading ? "Processing..." : "Start Paraphrasing"}
        </button>
      </div>
    </>
  );
}
