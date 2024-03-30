import CreateCatForm from "@/components/admin/CreateCatForm";

const CreateCatPage = () => {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">
        Create Category
      </h2>

      <div>
        <CreateCatForm />
      </div>
    </div>
  );
};

export default CreateCatPage;
