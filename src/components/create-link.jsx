
// import {Button} from "@/components/ui/button";
// import {
//   Dialog,
//   DialogContent,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
//   DialogTrigger,
// } from "@/components/ui/dialog";
// import {Input} from "@/components/ui/input";
// import {Card} from "./ui/card";
// import {useNavigate, useSearchParams} from "react-router-dom";
// import {useEffect, useRef, useState} from "react";
// import Error from "./error";
// import * as yup from "yup";
// import useFetch from "@/hooks/use-fetch";
// import {createUrl} from "@/db/apiUrls";
// import {BeatLoader} from "react-spinners";
// import {UrlState} from "@/context";
// import {QRCode} from "react-qrcode-logo";

// export function CreateLink() {
//   const {user} = UrlState();

//   const navigate = useNavigate();
//   const ref = useRef();

//   let [searchParams, setSearchParams] = useSearchParams();
//   const longLink = searchParams.get("createNew");

//   const [errors, setErrors] = useState({});
//   const [formValues, setFormValues] = useState({
//     title: "",
//     longUrl: longLink ? longLink : "",
//     customUrl: "",
//   });

//   const schema = yup.object().shape({
//     title: yup.string().required("Title is required"),
//     longUrl: yup
//       .string()
//       .url("Must be a valid URL")
//       .required("Long URL is required"),
//     customUrl: yup.string(),
//   });

//   const handleChange = (e) => {
//     setFormValues({
//       ...formValues,
//       [e.target.id]: e.target.value,
//     });
//   };

//   const {
//     loading,
//     error,
//     data,
//     fn: fnCreateUrl,
//   } = useFetch(createUrl, {...formValues, user_id: user.id});

//   useEffect(() => {
//     if (error === null && data) {
//       navigate(`/link/${data[0].id}`);
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [error, data]);

//   const createNewLink = async () => {
//     setErrors([]);
//     try {
//       await schema.validate(formValues, {abortEarly: false});

//       const canvas = ref.current.canvasRef.current;
//       const blob = await new Promise((resolve) => canvas.toBlob(resolve));

//       await fnCreateUrl(blob);
//     } catch (e) {
//       const newErrors = {};

//       e?.inner?.forEach((err) => {
//         newErrors[err.path] = err.message;
//       });

//       setErrors(newErrors);
//     }
//   };

//   return (
//     <Dialog
//       defaultOpen={longLink}
//       onOpenChange={(res) => {
//         if (!res) setSearchParams({});
//       }}
//     >
//       <DialogTrigger asChild>
//         <Button variant="destructive">Create New Link</Button>
//       </DialogTrigger>
//       <DialogContent className="sm:max-w-md">
//         <DialogHeader>
//           <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
//         </DialogHeader>
//         {formValues?.longUrl && (
//           <QRCode ref={ref} size={250} value={formValues?.longUrl} />
//         )}

//         <Input
//           id="title"
//           placeholder="Short Link's Title"
//           value={formValues.title}
//           onChange={handleChange}
//         />
//         {errors.title && <Error message={errors.title} />}
//         <Input
//           id="longUrl"
//           placeholder="Enter your Loooong URL"
//           value={formValues.longUrl}
//           onChange={handleChange}
//         />
//         {errors.longUrl && <Error message={errors.longUrl} />}
//         <div className="flex items-center gap-2">
//           <Card className="p-2">trimrr.in</Card> /
//           <Input
//             id="customUrl"
//             placeholder="Custom Link (optional)"
//             value={formValues.customUrl}
//             onChange={handleChange}
//           />
//         </div>
//         {error && <Error message={errors.message} />}
//         <DialogFooter className="sm:justify-start">
//           <Button
//             type="button"
//             variant="destructive"
//             onClick={createNewLink}
//             disabled={loading}
//           >
//             {loading ? <BeatLoader size={10} color="white" /> : "Create"}
//           </Button>
//         </DialogFooter>
//       </DialogContent>
//     </Dialog>
//   );
// }

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Card } from "./ui/card";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import Error from "./error";
import * as yup from "yup";
import useFetch from "@/hooks/use-fetch";
import { createUrl } from "@/db/apiUrls";
import { BeatLoader } from "react-spinners";
import { UrlState } from "@/context";
import { QRCode } from "react-qrcode-logo";

export function CreateLink() {
  const { user } = UrlState();
  const navigate = useNavigate();
  const ref = useRef();

  let [searchParams, setSearchParams] = useSearchParams();
  const longLink = searchParams.get("createNew");

  const [errors, setErrors] = useState({});
  const [formValues, setFormValues] = useState({
    title: "",
    longUrl: longLink ? longLink : "",
    customUrl: "",
  });

  const schema = yup.object().shape({
    title: yup.string().required("Title is required"),
    longUrl: yup
      .string()
      .url("Must be a valid URL")
      .required("Long URL is required"),
    customUrl: yup.string().matches(
      /^[a-zA-Z0-9_-]+$/,
      "Custom URL can only contain letters, numbers, dashes, and underscores"
    ),
  });

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.id]: e.target.value,
    });
  };

  const {
    loading,
    error,
    data,
    fn: fnCreateUrl,
  } = useFetch(createUrl, { ...formValues, user_id: user.id });

  useEffect(() => {
    if (error === null && data) {
      navigate(`/link/${data[0].id}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error, data]);

  const createNewLink = async () => {
    setErrors({});
    try {
      // Validate form fields using Yup schema
      await schema.validate(formValues, { abortEarly: false });

      const canvas = ref.current.canvasRef.current;
      const blob = await new Promise((resolve) => canvas.toBlob(resolve));

      // Call the function to create the new link
      await fnCreateUrl(blob);
    } catch (e) {
      const newErrors = {};

      // Capture validation errors from Yup and store them in state
      e?.inner?.forEach((err) => {
        newErrors[err.path] = err.message;
      });

      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      defaultOpen={longLink}
      onOpenChange={(res) => {
        if (!res) setSearchParams({});
      }}
    >
      <DialogTrigger asChild>
        <Button variant="destructive">Create New Link</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="font-bold text-2xl">Create New</DialogTitle>
        </DialogHeader>
        {formValues?.longUrl && (
          <QRCode ref={ref} size={250} value={formValues?.longUrl} />
        )}

        <Input
          id="title"
          placeholder="Short Link's Title"
          value={formValues.title}
          onChange={handleChange}
          aria-describedby="title-error"
        />
        {errors.title && <Error message={errors.title} id="title-error" />}
        
        <Input
          id="longUrl"
          placeholder="Enter your Loooong URL"
          value={formValues.longUrl}
          onChange={handleChange}
          aria-describedby="longUrl-error"
        />
        {errors.longUrl && <Error message={errors.longUrl} id="longUrl-error" />}

        <div className="flex items-center gap-2">
          <Card className="p-2">trimrr.in</Card> /
          <Input
            id="customUrl"
            placeholder="Custom Link (optional)"
            value={formValues.customUrl}
            onChange={handleChange}
            aria-describedby="customUrl-error"
          />
        </div>
        {errors.customUrl && <Error message={errors.customUrl} id="customUrl-error" />}

        {error && <Error message={error?.message || "An unexpected error occurred."} />}

        <DialogFooter className="sm:justify-start">
          <Button
            type="button"
            variant="destructive"
            onClick={createNewLink}
            disabled={loading}
          >
            {loading ? <BeatLoader size={10} color="white" /> : "Create"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

