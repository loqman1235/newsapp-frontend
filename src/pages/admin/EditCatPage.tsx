import EditCatForm from "@/components/admin/EditCatForm";

const EditCatPage = () => {
  return (
    <div>
      <h2 className="mb-2 text-2xl font-bold tracking-tight">Edit Category</h2>

      <div className="w-1/2 bg-background p-5 shadow">
        <EditCatForm />
      </div>
    </div>
  );
};

export default EditCatPage;
