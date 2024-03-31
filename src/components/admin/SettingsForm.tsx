import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "../ui/label";

const SettingsForm = () => {
  return (
    <form className="w-1/2 space-y-2">
      <div>
        <Label htmlFor="username">Username</Label>
        <Input
          type="text"
          id="username"
          name="username"
          placeholder="Enter a new username"
          className="w-full"
        />
      </div>

      <div>
        <Label htmlFor="username">Password</Label>
        <Input
          type="text"
          id="password"
          name="password"
          placeholder="Enter a new password"
          className="w-full"
        />
      </div>

      <Button type="submit" variant="default" className="rounded-sm">
        Save
      </Button>
    </form>
  );
};

export default SettingsForm;
