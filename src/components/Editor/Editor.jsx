import { useRef, useEffect } from "react";
import { Button } from "react-aria-components";
import { $getRoot } from "lexical";
import { $generateHtmlFromNodes } from "@lexical/html";
import { IconArrowLeft } from "@tabler/icons-react";
import LexicalEditor from "lexical-medium-editor";
import { initialConfig } from "lexical-medium-editor/config";
import "lexical-medium-editor/styles.css";
import "./editor_styles.css";

function Navbar({ onCopyHTML, onCopyJSON, onCopyText, onBack }) {
  return (
    <nav className="navbar">
      <div className="navbar-links">
        <Button className="navbar-btn" onPress={onBack}>
          <IconArrowLeft size={20} />
          Back
        </Button>
      </div>
      <div className="action-grp">
        <Button className="navbar-btn" onPress={onCopyHTML}>
          Copy HTML
        </Button>
        <Button className="navbar-btn" onPress={onCopyJSON}>
          Copy JSON
        </Button>
        <Button className="navbar-btn" onPress={onCopyText}>
          Copy Text
        </Button>
      </div>
    </nav>
  );
}

export default function Editor({ articleContent, onBack }) {
  const editorStateRef = useRef(null);
  const editorRef = useRef(null);

  // Load article content into editor when it changes
  useEffect(() => {
    const editor = editorRef.current;
    if (editor && articleContent) {
      queueMicrotask(() => {
        const editorState = editor.parseEditorState(JSON.stringify(articleContent));
        editor.setEditorState(editorState);
      });
    }
  }, [articleContent]);

  const handleOnChange = (editorState) => {
    editorStateRef.current = editorState;
  };

  const copyToClipboard = async (text) => {
    await navigator.clipboard.writeText(text);
  };

  const handleCopyHTML = () => {
    const editor = editorRef.current;
    if (editor) {
      editor.read(() => {
        const htmlString = $generateHtmlFromNodes(editor, null);
        copyToClipboard(htmlString);
      });
    }
  };

  const handleCopyJSON = () => {
    if (editorStateRef.current) {
      const jsonString = JSON.stringify(editorStateRef.current.toJSON(), null, 2);
      copyToClipboard(jsonString);
    }
  };

  const handleCopyText = () => {
    if (editorStateRef.current) {
      editorStateRef.current.read(() => {
        const textContent = $getRoot().getTextContent();
        copyToClipboard(textContent);
      });
    }
  };

  return (
    <>
      <Navbar
        onCopyHTML={handleCopyHTML}
        onCopyJSON={handleCopyJSON}
        onCopyText={handleCopyText}
        onBack={onBack}
      />
      <div className="editor-wrapper">
        <LexicalEditor
          initialConfig={initialConfig}
          onChange={handleOnChange}
          editorRef={editorRef}
          blockToolbarGap={32}
          isHeadingOneFirst={true}
          spellCheck={false}
        />
      </div>
    </>
  );
}