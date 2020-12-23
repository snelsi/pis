import * as React from "react";
import { Input, Sex, PhoneInput, TextArea } from "components/assets";
import { prettyDate } from "scripts/helpers";

export const Form: React.FC = () => (
  <>
    <Input name="name" title="Name" placeholder="Ivan Ivanov" wide />
    <PhoneInput name="phone" title="Phone" placeholder="+380 65  413 2425" wide />
    <Input name="email" title="Email" placeholder="you@mail.com" wide required={false} />
    <Input
      name="birthday"
      title="Birthday"
      type="date"
      placeholder={prettyDate(new Date())}
      wide
      required={false}
    />

    <Sex />

    <TextArea
      name="comment"
      title="Comment"
      placeholder="Write your annotations here"
      wide
      required={false}
    />
  </>
);
