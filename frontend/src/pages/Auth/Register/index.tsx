import {
  WrapperLogin,
  ContainerLogin,
  ContainerForm,
  WrapperTitle,
  WrapperForm,
  WrapperPassword,
  WrapperButton,
  FixedStripe,
} from "../styles";
import z from "zod";
import { useAuth } from "@/hooks";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { RegisterSchema } from "@/utils/registerSchema";
import InfoLogin from "@/components/globals/Layout/InfoLogin";
import InputLogin from "@/components/globals/Forms/InputLogin";
import InputPassword from "@/components/globals/Forms/InputPassword";
import ButtonDefault from "@/components/globals/Forms/ButtonDefault";

type Inputs = z.infer<typeof RegisterSchema>;

export default function Register() {
  const { register } = useAuth();
  const navigate = useNavigate();

  const {
    register: formRegister,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(RegisterSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await register({
        name: data.name,
        password: data.password,
        type: data.accountType,
        level: data.accountLevel,
      });
      reset();
      navigate("/");
    } catch (error) {
      if (error.response && error.response.status === 400) {
        console.error("Dados inválidos.");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <WrapperLogin>
      <FixedStripe></FixedStripe>
      <ContainerLogin>
        <InfoLogin />
        <ContainerForm>
          <WrapperTitle>
            <h2>Registro</h2>
          </WrapperTitle>
          <WrapperForm onSubmit={handleSubmit(onSubmit)}>
            <InputLogin
              label="Nome"
              placeholder="Digite seu nome"
              messageError={errors.name?.message}
              register={formRegister}
              registerName="name"
              type="text"
            />
            <label htmlFor="accountType">Tipo de Conta</label>
            <select
              id="accountType"
              {...formRegister("accountType")}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            >
              <option value="CORRENTE">CORRENTE</option>
              <option value="POUPANCA">POUPANCA</option>
            </select>
            {errors.accountType && <p>{errors.accountType.message}</p>}

            <label htmlFor="accountLevel">Nível de Conta</label>
            <select
              id="accountLevel"
              {...formRegister("accountLevel")}
              style={{ width: "100%", padding: "0.5rem", marginBottom: "1rem" }}
            >
              <option value="OURO">OURO</option>
              <option value="PRATA">PRATA</option>
              <option value="BRONZE">BRONZE</option>
            </select>
            {errors.accountLevel && <p>{errors.accountLevel.message}</p>}

            <InputPassword
              label="Senha"
              placeholder="Digite sua senha"
              messageError={errors.password?.message}
              register={formRegister}
              registerName="password"
            />
            <WrapperPassword>
              <InputPassword
                label="Confirme sua senha"
                placeholder="Digite sua senha novamente"
                messageError={errors.confirmPassword?.message}
                register={formRegister}
                registerName="confirmPassword"
              />
              <WrapperButton>
                Já tem cadastro?{" "}
                <button onClick={() => navigate("/")}>Clique aqui</button>
              </WrapperButton>
            </WrapperPassword>

            <ButtonDefault
              variant="contained"
              color="secondary"
              type="submit"
              text="CADASTRAR"
              styles={{ width: "100%", height: "3rem", fontSize: "1rem" }}
            />
          </WrapperForm>
        </ContainerForm>
      </ContainerLogin>
    </WrapperLogin>
  );
}
