
import { zodResolver } from "@hookform/resolvers/zod";
import clsx from "clsx";
import { ZodType, ZodTypeDef } from "zod";
import {
  FieldValues,
  SubmitHandler,
  UseFormProps,
  UseFormReturn,
  useForm
} from "react-hook-form";

type FormProps<TFormValues extends FieldValues, Schema> = {
  className?: string;
  onSubmit?: SubmitHandler<TFormValues>;
  children: (methods: UseFormReturn<TFormValues>) => React.ReactNode;
  options?: UseFormProps<TFormValues>;
  id?: string;
  schema?: Schema;
};

export const Form = <
  Values extends Record<string, unknown> = Record<string, unknown>,
  Schema extends ZodType<unknown, ZodTypeDef, unknown> = ZodType<
    unknown,
    ZodTypeDef,
    unknown
  >
>({
  onSubmit,
  children,
  className,
  options,
  id,
  schema,
}: FormProps<Values, Schema>) => {
  const methods = useForm<Values>({
    ...options,
    resolver: schema && zodResolver(schema)
  });
  return (
    <form
      className={clsx("space-y-2", className)}
      // eslint-disable-next-line @typescript-eslint/no-misused-promises
      onSubmit={onSubmit && methods.handleSubmit(onSubmit)}
      id={id}
    >
      {children(methods)}
    </form>
  );
};
