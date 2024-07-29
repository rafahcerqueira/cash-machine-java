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
import { ResetPasswordSchema } from "@/utils/resetPasswordSchema";
import InfoLogin from "@/components/globals/Layout/InfoLogin";
import InputPassword from "@/components/globals/Forms/InputPassword";
import ButtonDefault from "@/components/globals/Forms/ButtonDefault";

type Inputs = z.infer<typeof ResetPasswordSchema>;

export default function Register() {
  const { resetPassword } = useAuth();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    mode: "all",
    criteriaMode: "all",
    resolver: zodResolver(ResetPasswordSchema),
  });

  const onSubmit: SubmitHandler<Inputs> = (data) => {
    resetPassword({
      password: data.senha,
      confirmPassword: data.confirmar_senha,
    })
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        if (error.response && error.response.status === 400) {
          console.error("Senha e confirmação de senha não conferem.");
        } else if (error.response && error.response.status === 404) {
          console.error("Usuário não encontrado.");
        } else {
          console.error(error);
        }
      });
  };

  const onChangeCpf = (value: string) => {
    const clearCPF = value.replace(/\D+/g, "");
    const maskedCPF = clearCPF.replace(
      /(\d{3})(\d{3})(\d{3})(\d{2})/,
      "$1.$2.$3-$4"
    );
    setValue("conta", maskedCPF);
  };

  return (
    <WrapperLogin>
      <FixedStripe></FixedStripe>
      <ContainerLogin>
        <InfoLogin />
        <ContainerForm>
          <WrapperTitle>
            <h2>Escolha sua senha</h2>
          </WrapperTitle>
          <WrapperForm onSubmit={handleSubmit(onSubmit)}>
            <InputLogin
              label="Conta"
              placeholder="Digite seu CPF"
              messageError={errors.cpf?.message}
              register={register}
              registerName="conta"
              type="text"
              maxLength={14}
              onMaskChange={onChangeCpf}
            />
            <InputPassword
              label="Senha"
              placeholder="Digite sua senha"
              messageError={errors.senha?.message}
              register={register}
              registerName="senha"
            />
            <WrapperPassword>
              <InputPassword
                label="Digite senha novamente"
                placeholder="Digite sua senha"
                messageError={errors.confirmar_senha?.message}
                register={register}
                registerName="confirmar_senha"
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
              text="ENTRAR"
              styles={{ width: "100%", height: "3rem", fontSize: "1rem" }}
            />
          </WrapperForm>
        </ContainerForm>
      </ContainerLogin>
    </WrapperLogin>
  );
}
