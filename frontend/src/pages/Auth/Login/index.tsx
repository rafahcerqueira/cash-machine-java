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
import { theme } from "@/theme";

type Inputs = z.infer<typeof LoginSchema>;

export default function Login() {
  const { loginIn, errorMessage } = useAuth();
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
      await loginIn({
        accountNumber: data.accountNumber,
        name: data.name,
        password: data.password,
      });
      if (errorMessage) {
        reset();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  const onChangeAccountNumber = (value: string) => {
    const clearAccountNumber = value.replace(/\D+/g, "");
    const maskedAccountNumber = clearAccountNumber.replace(
      /(\d{7})(\d{0,7})/,
      "$1-$2"
    );
    setValue("accountNumber", maskedAccountNumber);
  };

  return (
    <WrapperLogin>
      <FixedStripe></FixedStripe>
      <ContainerLogin>
        <InfoLogin />
        <ContainerForm>
          <WrapperTitle>
            <h2>Entrar</h2>
          </WrapperTitle>
          <WrapperForm onSubmit={handleSubmit(onSubmit)}>
            <InputLogin
              label="Conta"
              placeholder="Digite sua conta"
              messageError={errors.accountNumber?.message}
              register={register}
              registerName="accountNumber"
              type="text"
              maxLength={9}
              onMaskChange={onChangeAccountNumber}
            />
            <InputLogin
              label="Nome"
              placeholder="Digite seu nome"
              messageError={errors.name?.message}
              register={register}
              registerName="name"
              type="text"
              maxLength={50}
            />
            <WrapperPassword>
              <InputPassword
                label="Senha"
                placeholder="Digite sua senha"
                messageError={errors.password?.message}
                register={register}
                registerName="password"
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
            {errorMessage && (
              <div style={{ color: theme.colors.p4, marginTop: "1rem" }}>
                {errorMessage}
              </div>
            )}
            <WrapperButton>
              Não tem uma conta?{" "}
              <button onClick={() => navigate("/cadastro")}>Registre-se</button>
            </WrapperButton>
          </WrapperForm>
        </ContainerForm>
      </ContainerLogin>
    </WrapperLogin>
  );
}
