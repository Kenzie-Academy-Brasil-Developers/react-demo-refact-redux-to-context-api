import { TextField, Button } from "@material-ui/core";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useState } from "react";
import * as yup from "yup";
// import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
// import { signInThunk } from "../../store/modules/user/thunks";

import { useAuth } from "../../Providers/Auth";

import { Container } from "./styles";

function Login() {
  const [error, setError] = useState(false);
  const { sigIn } = useAuth();

  const schema = yup.object().shape({
    username: yup.string().required("Campo obrigatório"),
    password: yup
      .string()
      .min(6, "Mínimo de 6 dígitos")
      .required("Campo obrigatório"),
  });

  const history = useHistory();

  // const dispatch = useDispatch();

  const { register, handleSubmit, errors } = useForm({
    resolver: yupResolver(schema),
  });

  const onSubmit = (data) => {
    // dispatch(signInThunk(data, setError, history));
    sigIn(data, setError, history);
  };

  return (
    <Container>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Nome de usuário"
            name="username"
            size="small"
            color="primary"
            inputRef={register}
            error={!!errors.username}
            helperText={errors.username?.message}
          ></TextField>
        </div>

        <div>
          <TextField
            margin="normal"
            variant="outlined"
            label="Senha"
            name="password"
            type="password"
            size="small"
            color="primary"
            inputRef={register}
            error={!!errors.password}
            helperText={errors.password?.message}
          ></TextField>
        </div>
        <Button type="submit" variant="contained" color="primary" size="large">
          Enviar
        </Button>
      </form>
      {error && <span> Usuário ou senha incorretas! </span>}
    </Container>
  );
}

export default Login;
