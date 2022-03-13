// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import {
  apiInstance,
  createContact,
  transactionalEmailsApi,
} from "../../utils/api/sendinblue";

export default async (req, res) => {
  const { body } = req;
  const { email } = JSON.parse(body);

  try {
    // let result = await apiInstance.createContact({
    //   ...createContact,
    //   email,
    //   listIds: [5],
    // });
    let resultSendEmail = await transactionalEmailsApi.sendTransacEmail({
      to: [{ email: email }],
      templateId: 3,
      attachment: [{"url":"https://docs-yefri.s3.amazonaws.com/cv_v4.pdf", "name":"cv_yefri_laura.pdf"}]
    });
    console.log(
      "API called successfully. Returned data: " + JSON.stringify(resultSendEmail)
    );

    res.statusCode = 200;
    res.json({ name: "John Doe" });
  } catch (error) {
    console.log(error);
    let { code } = error.response.body;
    console.log(body);

    if (code === "duplicate_parameter") {
      res.status(200).json({ error: "duplicate_parameter" });
    } else {
      res.status(400).json({ error: "not_found" });
    }
  }
};
