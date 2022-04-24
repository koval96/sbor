import { useState, useEffect, useRef, useContext } from "react";
import { useMutation } from "@apollo/client";
import { useHistory } from "react-router-dom";

import Upload from "../utils/Upload";

import { CREATE_OPERATION } from "../../gql/mutations/createOperation";
import { UserContext } from "../auth/AuthLayer";

function CreateOperation() {
  const { user } = useContext(UserContext);
  const [name, setName] = useState();
  const [age, setAge] = useState();
  const [description, setDescription] = useState();
  const [appearance, setAppearance] = useState();
  const [adress, setAdress] = useState();
  const [coords, setCoords] = useState();
  const [dateSearch, setDateSearch] = useState();
  const [plan, setPlan] = useState();
  const [file, setFile] = useState();
  const [src, setSrc] = useState("");
  const [upload, setUpload] = useState(false);
  const fileInputRef = useRef(null);
  const history = useHistory()

  const [createOperation, { loading }] = useMutation(CREATE_OPERATION, {
    onCompleted: (data) => {
      history.push(`/operations/${data.createOperation.id}`);
    },
  });

  useEffect(() => {
    if (src !== "") {
      setUpload(false);
      createOperation({
        variables: {
          name,
          age,
          description,
          appearance,
          adress,
          coords,
          searchStart: dateSearch,
          plan,
          imageUrl: src,
          username: user.username,
        },
      });
    }
  }, [src]);

  return (
    <div>
      <h2>Создание операции</h2>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          setUpload(true);
        }}
      >
        <input
          type="text"
          placeholder="ФИО"
          defaultValue={name}
          onChange={(e) => setName(e.target.value)}
          className="login__input mt-1"
          required
        />
        <input
          type="text"
          placeholder="Возраст"
          defaultValue={age}
          onChange={(e) => setAge(e.target.value)}
          className="login__input mt-1"
          required
        />
        <input
          type="text"
          placeholder="Описание происшествия"
          defaultValue={description}
          onChange={(e) => setDescription(e.target.value)}
          className="login__input mt-1"
          required
        />
        <input
          type="text"
          placeholder="Дата пропажи"
          defaultValue={dateSearch}
          onChange={(e) => setDateSearch(e.target.value)}
          className="login__input mt-1"
          required
        />
        <input
          type="text"
          placeholder="Приметы"
          defaultValue={appearance}
          onChange={(e) => setAppearance(e.target.value)}
          className="login__input mt-1"
          required
        />
        <input
          type="text"
          placeholder="Адрес сбора"
          defaultValue={adress}
          onChange={(e) => setAdress(e.target.value)}
          className="login__input mt-1"
          required
        />
        <input
          type="text"
          placeholder="Координаты"
          defaultValue={coords}
          onChange={(e) => setCoords(e.target.value)}
          className="login__input mt-1"
          required
        />
        <textarea
          className="login__input mt-1"
          cols="30"
          rows="10"
          defaultValue={plan}
          placeholder={"План операции"}
          onChange={(e) => setPlan(e.target.value)}
          required
        ></textarea>
        <input
          ref={fileInputRef}
          type="file"
          hidden="true"
          accept="image/png, image/jpg, image/jpeg"
          onChange={(e) => setFile(e.target.files[0])}
        />
        {!file ? (
          <button
            type="button"
            className="default__btn default__btn_outline mt-1"
            onClick={() => fileInputRef.current.click()}
          >
            Добавить фото*
          </button>
        ) : (
          <p className="mt-1">{file.name}</p>
        )}

        {upload && <Upload file={file} type={"docs"} src={{ src, setSrc }} />}

        <button className="default__btn mt-2" disabled={!file}>
          Создать ориентировку
        </button>
      </form>
    </div>
  );
}

export default CreateOperation;
