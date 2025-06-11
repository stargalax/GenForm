export const dynamic = "force-dynamic";
import { getForms } from "@/actions/getForms";
import FormList from "@/components/FormList";
import GenerateFormInput from "@/components/GenerateFormInput";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription, 
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import React from "react";

const MyForm = async () => {
  const forms = await getForms();

return (
  <div>
    <section className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 max-w-7xl mx-auto mb-4 px-2">
      <h1 className="font-bold text-xl">My Forms</h1>
      <Dialog>
        <DialogTrigger asChild>
          <Button variant="outline">
            <Plus /> Create New Form
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Write a prompt</DialogTitle>
            <DialogDescription>
              Write a clean prompt to get better results.
            </DialogDescription>
          </DialogHeader>
          <GenerateFormInput text="Your prompt here" totalForms={forms?.data?.length || 0} isSubscribed={true} />
        </DialogContent>
      </Dialog>
    </section>
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 px-2">
      {forms?.data?.map((form:any, index: number) => (
        <FormList key={index} form={form} />
      ))}
    </div>
  </div>
);
};

export default MyForm;