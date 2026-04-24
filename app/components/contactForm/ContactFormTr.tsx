import { useForm } from "react-hook-form";

const ContactFormTr = () => {
  const {
    register,
    trigger,
    reset,
    formState: { errors },
  } = useForm();

  const onSubmit = async (e: any) => {
    const isValid = await trigger();
    setTimeout(() => {
      reset();
    }, 2000);
    if (!isValid) {
      e.preventDefault();
    }
  };

  return (
    <div>
      <form
        className="w-full flex flex-col gap-5 py-5"
        target="_blank"
        onSubmit={onSubmit}
        action="https://formsubmit.co/osmansamilerdogan@gmail.com"
        method="POST"
      >
        <input
          className="w-full mx-auto py-3 border-2 rounded-lg px-5 "
          type="text"
          placeholder="ISIM SOYISIM"
          {...register("name", {
            required: true,
            maxLength: 100,
          })}
        />
        {errors.name && (
          <p className="w-full mx-auto pt-1 text-red-500">
            {errors.name.type === "required" && "This field is required."}
            {errors.name.type === "maxLength" && "Max length is 100 char."}
          </p>
        )}

        <input
          className="w-full mx-auto py-3 border-2 rounded-lg px-5 "
          type="text"
          placeholder="EMAIL"
          {...register("email", {
            required: true,
            pattern: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
          })}
        />
        {errors.email && (
          <p className="w-full mx-auto pt-1 text-red-500">
            {errors.email.type === "required" && "This field is required."}
            {errors.email.type === "pattern" && "Invalid email address."}
          </p>
        )}

        <textarea
          className="w-full mx-auto py-3 border-2 rounded-lg px-5 "
          placeholder="MESAJ"
          rows={4}
          cols={50}
          {...register("message", {
            required: true,
            maxLength: 2000,
          })}
        />
        {errors.message && (
          <p className="w-full mx-auto pt-1 text-red-500">
            {errors.message.type === "required" && "This field is required."}
            {errors.message.type === "maxLength" && "Max length is 2000 char."}
          </p>
        )}

        <button
          type="submit"
          className={`bg-black hover:bg-white hover:text-black text-white w-fit  mx-auto px-10 rounded-lg font-[500] text-xl py-2`}
        >
          Gonder
        </button>
      </form>
    </div>
  );
};

export default ContactFormTr;
