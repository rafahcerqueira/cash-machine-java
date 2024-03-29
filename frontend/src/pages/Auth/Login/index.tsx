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
import { LoginSchema } from "@/utils/loginSchema";
import InfoLogin from "@/components/globals/Layout/InfoLogin";
import InputLogin from "@/components/globals/Forms/InputLogin";
import InputPassword from "@/components/globals/Forms/InputPassword";
import ButtonDefault from "@/components/globals/Forms/ButtonDefault";
import LogoCashMachine from "@/assets/images/cash-machine.svg";
import { useEffect } from "react";

type Inputs = z.infer<typeof LoginSchema>;

export default function Login() {
  const { setIsAuthenticated, loginIn, user } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(LoginSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      await loginIn({ cpf: data.cpf, password: data.senha });
      reset();
    } catch (error) {
      if (error.response && error.response.status === 401) {
        console.error("Credenciais inválidas. Verifique seu CPF e senha.");
      } else if (error.response && error.response.status === 404) {
        console.error("Usuário não encontrado.");
      } else {
        console.error(error);
      }
    }
  };

  useEffect(() => {
    if (user.primeiroAcesso) {
      navigate("/primeiro-acesso");
    } else if (user.primeiroAcesso === false) {
      setIsAuthenticated(true);
    }
  }, [user]);

  const onChangeCpf = (value: string) => {
    const clearCPF = value.replace(/\D+/g, "");
    const maskedCPF = clearCPF.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
    setValue("cpf", maskedCPF);
  };

  return (
    <WrapperLogin>
      <FixedStripe></FixedStripe>
      <ContainerLogin>
        <InfoLogin />
        <ContainerForm>
          <WrapperTitle>
            <div>
              Seja bem-vindo ao
              <img src={LogoCashMachine} alt="Logo - Cash Machine" />
            </div>
            <h2>Entrar</h2>
          </WrapperTitle>
          <WrapperForm onSubmit={handleSubmit(onSubmit)}>
            <InputLogin
              label="CPF"
              placeholder="Digite seu CPF"
              messageError={errors.cpf?.message}
              register={register}
              registerName="cpf"
              type="text"
              maxLength={14}
              onMaskChange={onChangeCpf}
            />
            <WrapperPassword>
              <InputPassword
                label="Senha"
                placeholder="Digite sua senha"
                messageError={errors.senha?.message}
                register={register}
                registerName="senha"
              />
              <WrapperButton>
                Esqueceu a senha?{" "}
                <button onClick={() => navigate("/resetar-senha")}>
                  Clique aqui
                </button>
              </WrapperButton>
            </WrapperPassword>

            <ButtonDefault
              variant="contained"
              color="secondary"
              type="submit"
              text="ENTRAR"
              styles={{ width: "100%", height: "3rem", fontSize: "1rem" }}
            />
          </WrapperForm>
        </ContainerForm>
      </ContainerLogin>
    </WrapperLogin>
  );
}
