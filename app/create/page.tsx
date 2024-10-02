import CreateForm from "@components/createForm";

const CreatePage = () => {
  return (
    <div className="flex flex-col items-center">
      <div className="text-2xl font-bold mb-5">
        Create Token
      </div>
      <CreateForm />
    </div>
  );
};

export default CreatePage;
