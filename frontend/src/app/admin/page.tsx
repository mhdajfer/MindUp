"use client";

import { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { axiosInstance } from "@/utils/axios";
import { Response } from "../types/Response";
import { AxiosError } from "axios";

// Define the form schema with zod
const questionSchema = z.object({
  question: z
    .string()
    .min(5, { message: "Question must be at least 5 characters" }),
  category: z.string().min(1, { message: "Please select a category" }),

  options: z
    .array(
      z.object({
        text: z.string().min(1, { message: "Option text is required" }),
      })
    )
    .length(4, { message: "You must provide exactly 4 options" }),
  correctOption: z
    .string()
    .min(1, { message: "Please select the correct answer" }),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

const categories = [
  { id: "science", name: "Science" },
  { id: "geography", name: "Geography" },
  { id: "history", name: "History" },
  { id: "music", name: "Music" },
  { id: "movies", name: "Movies" },
  { id: "gaming", name: "Gaming" },
];

export default function Page() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      category: "",
      options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
      correctOption: "",
    },
  });

  const { fields } = useFieldArray({
    control,
    name: "options",
  });

  const correctOption = watch("correctOption");

  const onSubmit = async (_data: QuestionFormValues) => {
    try {
      setIsSubmitting(true);


      if (!_data.category || !_data.question || !_data.correctOption) {
        toast.warning("Please fill in all required fields");
        setIsSubmitting(false);
      }

      const newOptions = _data.options.map((option, index) =>
        index == Number(_data.correctOption)
          ? { ...option, isCorrect: true }
          : { ...option, isCorrect: false }
      );

      _data.options = newOptions;

      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { correctOption, ...quizData } = _data;

      console.log("Form submitted with data:");
      const { data }: Response = await axiosInstance.post("/quiz", {
        quizData,
      });

      if (data.success) {
        toast.success(data.message);
      }

      reset({
        question: "",
        category: _data.category,
        options: [{ text: "" }, { text: "" }, { text: "" }, { text: "" }],
        correctOption: "",
      });
    } catch (err) {
      if (err instanceof AxiosError) {
        toast.error(err.response?.data.message);
      }
      console.error("Error submitting form:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        {/* Question Form */}
        <Card className="border-violet-200 dark:border-violet-800 shadow-lg">
          <CardHeader className=" rounded-t-lg">
            <CardTitle>Add New Question</CardTitle>
            <CardDescription className="">
              Create a new quiz question with multiple choice answers
            </CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 pt-6">
              {/* Question Text */}
              <div className="space-y-2">
                <Label htmlFor="question" className="text-base font-medium">
                  Question Text <span className="text-red-500">*</span>
                </Label>
                <Textarea
                  id="question"
                  placeholder="Enter your question here..."
                  className="min-h-[100px]"
                  {...register("question")}
                />
                {errors.question && (
                  <p className="text-sm text-red-500">
                    {errors.question.message}
                  </p>
                )}
              </div>

              {/* Category  */}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <Label htmlFor="category" className="text-base font-medium">
                    Category <span className="text-red-500">*</span>
                  </Label>
                  <Select
                    onValueChange={(value) => {
                      const event = {
                        target: { name: "category", value },
                      } as React.ChangeEvent<HTMLSelectElement>;
                      register("category").onChange(event);
                    }}
                    defaultValue=""
                  >
                    <SelectTrigger
                      id="category"
                      className={errors.category ? "border-red-500" : ""}
                    >
                      <SelectValue placeholder="Select a category" />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  {errors.category && (
                    <p className="text-sm text-red-500">
                      {errors.category.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Options */}
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <Label className="text-base font-medium">
                    Answer Options <span className="text-red-500">*</span>
                  </Label>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Select the correct answer
                  </p>
                </div>

                <RadioGroup
                  value={correctOption}
                  onValueChange={(value) => {
                    const event = {
                      target: { name: "correctOption", value },
                    } as React.ChangeEvent<HTMLInputElement>;
                    register("correctOption").onChange(event);
                  }}
                  className="space-y-3"
                >
                  {fields.map((field, index) => (
                    <div key={field.id} className="flex items-center space-x-3">
                      <RadioGroupItem
                        value={index.toString()}
                        id={`option-${index}`}
                        className="border-2 border-violet-400 text-violet-600"
                      />
                      <div className="flex-1">
                        <Input
                          placeholder={`Option ${index + 1}`}
                          {...register(`options.${index}.text`)}
                          className={
                            errors.options?.[index]?.text
                              ? "border-red-500"
                              : correctOption === index.toString()
                              ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                              : ""
                          }
                        />
                        {errors.options?.[index]?.text && (
                          <p className="text-sm text-red-500 mt-1">
                            {errors.options[index]?.text?.message}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </RadioGroup>
                {errors.correctOption && (
                  <p className="text-sm text-red-500">
                    {errors.correctOption.message}
                  </p>
                )}
              </div>
            </CardContent>
            <CardFooter className="mt-6 flex justify-between border-t border-gray-200 dark:border-gray-800 px-6 py-4">
              <Button
                type="button"
                variant="outline"
                onClick={() => reset()}
                disabled={isSubmitting}
              >
                Clear Form
              </Button>
              <Button
                type="submit"
                className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Saving..." : "Save Question"}
              </Button>
            </CardFooter>
          </form>
        </Card>

        <Card className="mt-8 border-violet-200 dark:border-violet-800">
          <CardHeader>
            <CardTitle>Recent Questions</CardTitle>
            <CardDescription>
              Recently added questions will appear here
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="text-center py-8 text-gray-500 dark:text-gray-400">
              <p>Questions you add will be displayed here</p>
              <Button
                variant="link"
                className="text-violet-600 dark:text-violet-400"
                onClick={() => {
                  alert(
                    "This would navigate to a question list page in a real application"
                  );
                }}
              >
                View all questions
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
