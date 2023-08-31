/* eslint-disable linebreak-style */
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import './FormPreviewEnunciated.scss';

const FormPreviewEnunciated = ({ enunciated }) => (
  <div className="enunciated__content">
    <ReactMarkdown remarkPlugins={[remarkGfm]}>
      {enunciated}
    </ReactMarkdown>
  </div>
);

export default FormPreviewEnunciated;
