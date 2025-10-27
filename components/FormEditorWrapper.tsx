"use client";
import React, { useState } from "react";
import FormEditor from "./FormEditor";
import { updateForm } from "@/actions/updateForm";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";
import FormPublishButton from "./FormPublishButton";
import { Button } from "./ui/button";
import { ArrowLeft, Pencil, Check, X } from "lucide-react";
import { Input } from "./ui/input";

type FormData = {
  formTitle: string;
  formFields: Array<{
    id: string;
    label: string;
    name: string;
    type: string;
    placeholder?: string;
    options?: string[];
    required: boolean;
  }>;
};

type Props = {
  form: any;
};

const FormEditorWrapper: React.FC<Props> = ({ form }) => {
  const router = useRouter();
  const [isEditingTitle, setIsEditingTitle] = useState(false);
  const [formTitle, setFormTitle] = useState(
    typeof form.content === 'string' 
      ? JSON.parse(form.content).formTitle 
      : form.content.formTitle
  );
  const [isSaving, setIsSaving] = useState(false);

  const handleSave = async (formData: FormData) => {
    try {
      const result = await updateForm(form.uuid, formData);
      
      if (result.success) {
        toast.success(result.message);
        router.refresh(); // Refresh the page to show updated data
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error("Error saving form:", error);
      toast.error("An error occurred while saving the form");
    }
  };

  const saveFormTitle = async () => {
    if (!formTitle.trim()) {
      toast.error("Form title cannot be empty");
      return;
    }
    
    setIsSaving(true);
    try {
      const content = typeof form.content === 'string' 
        ? JSON.parse(form.content) 
        : form.content;

      const result = await updateForm(form.uuid, {
        formTitle: formTitle,
        formFields: (content.formFields || []).map((field: any) => ({
          id: field.name || field.id || '',
          label: field.label || '',
          name: field.name || '',
          type: field.type || 'text',
          placeholder: field.placeholder || '',
          options: field.options || [],
          required: field.required !== undefined ? field.required : true
        }))
      });

      if (result.success) {
        toast.success("Form title updated");
        setIsEditingTitle(false);
        router.refresh();
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      console.error("Error updating form title:", err);
      toast.error("Failed to update title");
    } finally {
      setIsSaving(false);
    }
  };

  const cancelEdit = () => {
    const originalTitle = typeof form.content === 'string' 
      ? JSON.parse(form.content).formTitle 
      : form.content.formTitle;
    setFormTitle(originalTitle);
    setIsEditingTitle(false);
  };

  return (
    <div>
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <Button 
            variant="ghost" 
            onClick={() => router.push('/dashboard/forms')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Forms
          </Button>
          <FormPublishButton 
            formId={form.uuid}
            isPublished={form.published}
            variant="default"
          />
        </div>
        {isEditingTitle ? (
          <div className="flex items-center gap-3 mb-2">
            <Input 
              value={formTitle}
              onChange={(e) => setFormTitle(e.target.value)}
              className="text-3xl font-bold h-auto py-2 px-3 max-w-2xl"
              disabled={isSaving}
              onKeyDown={(e) => {
                if (e.key === 'Enter') saveFormTitle();
                if (e.key === 'Escape') cancelEdit();
              }}
            />
            <Button 
              size="sm" 
              onClick={saveFormTitle}
              disabled={isSaving}
            >
              <Check className="h-4 w-4" />
            </Button>
            <Button 
              size="sm" 
              variant="outline"
              onClick={cancelEdit}
              disabled={isSaving}
            >
              <X className="h-4 w-4" />
            </Button>
          </div>
        ) : (
          <div className="flex items-center gap-3 mb-2 group">
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              {formTitle}
            </h1>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditingTitle(true)}
              className="opacity-0 group-hover:opacity-100 transition-opacity"
            >
              <Pencil className="h-4 w-4" />
            </Button>
          </div>
        )}
        <p className="text-gray-600 dark:text-gray-400 mt-2">
          Customize your form by adding, editing, or removing fields. Once ready, publish and share your form!
        </p>
      </div>
      
      <FormEditor form={form} onSave={handleSave} />
    </div>
  );
};

export default FormEditorWrapper;