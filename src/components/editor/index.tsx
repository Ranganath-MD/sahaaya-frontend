/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { EditorState, convertToRaw, ContentState } from "draft-js";
import draftToHtml from "draftjs-to-html";
import { useDebounce } from "react-use";
import { Editor } from "react-draft-wysiwyg";
import "react-draft-wysiwyg/dist/react-draft-wysiwyg.css";
import styled from "styled-components";
import "./index.scss";
import htmlToDraft from "html-to-draftjs";

const Label = styled.div<{ required?: boolean }>`
  color: #697384;
  font-size: 12px;
  &::after {
    content: ${(props) => (props.required ? "'*'" : false)};
    color: #b30c0c;
  }
`;
interface Props {
  onChange: (value: any) => any;
  label?: string;
  required?: boolean;
  content?: any;
}

export const RichText: React.FC<Props> = (props: any) => {
  const [editorState, setEditorState] = useState<any>(
    EditorState.createEmpty()
  );

  useEffect(() => {
    if (props.content) {
      const contentBlock = htmlToDraft(props.content);

      if (contentBlock) {
        const contentState = ContentState.createFromBlockArray(
          contentBlock.contentBlocks
        );
        const editorState = EditorState.createWithContent(contentState);
        setEditorState(EditorState.moveFocusToEnd(editorState));
      }
    }
  }, [props.content]);

  const handleChange = () => {
    if (editorState === undefined) return null;
    const content = editorState.getCurrentContent();
    const hasText = content.hasText();
    const currentPlainText = content.getPlainText();
    const lengthOfEditorContent = currentPlainText.length;
    return props.onChange({
      value: draftToHtml(convertToRaw(content)),
      hasText,
      text: currentPlainText,
      length: lengthOfEditorContent
    });
  };

  const [,] = useDebounce(() => handleChange(), 2000, [editorState]);
  return (
    <>
      <Label required={props.required}>{props.label}</Label>
      <Editor
        editorState={editorState || props.value}
        wrapperClassName="normal"
        // editorClassName="editor-content"
        toolbarClassName="toolbar"
        onEditorStateChange={setEditorState}
        placeholder="Write breifly about your campaign/cause here...."
        toolbarOnFocus={props.toolbarOnFocus}
        toolbar={{
          options: ["inline", "blockType", "list", "link", "history"],
          inline: {
            inDropdown: false,
            options: ["bold", "italic", "underline"],
          },
          blockType: {
            inDropdown: true,
            options: ["Normal", "H1", "H2", "H3", "Blockquote"],
          },
        }}
      />
    </>
  );
};
