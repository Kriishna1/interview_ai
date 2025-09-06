"use client";

import { useState, useRef } from "react";
import { Editor } from "@monaco-editor/react";
import { usePiston } from "../../utils/hooks/usePiston";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import { Panel, PanelGroup, PanelResizeHandle } from "react-resizable-panels";

// Helper: Map UI language names to Piston language identifiers
const getPistonLanguage = (language: string): "cpp" | "javascript" | "typescript" | "python3" | "java" => {
  const languageMap: { [key: string]: "cpp" | "javascript" | "typescript" | "python3" | "java" } = {
    "C++": "cpp",
    "JavaScript": "javascript",
    "TypeScript": "typescript",
    "Python": "python3",
    "Java": "java",
  };
  return languageMap[language] as "cpp" | "javascript" | "typescript" | "python3" | "java";
};

interface File {
  name: string;
  content: string;
  language: string;
}

export default function CodeEditor() {
  // Start with one file, defaulting to JavaScript
  const [files, setFiles] = useState<File[]>([
    { name: "Untitled", content: "", language: "JavaScript" },
  ]);
  const [activeFile, setActiveFile] = useState(0);
  const [input, setInput] = useState("");
  const editorRef = useRef(null);
  const { runCode, output, error, isLoading } = usePiston();

  const handleEditorDidMount = (editor: any) => {
    editorRef.current = editor;
  };

  const handleLanguageChange = (value: string) => {
    const updatedFiles = [...files];
    updatedFiles[activeFile].language = value;
    setFiles(updatedFiles);
  };

  const handleRunCode = () => {
    const currentFile = files[activeFile];
    // Map the UI language to Piston language id
    const pistonLanguage = getPistonLanguage(currentFile.language);
    runCode(currentFile.content, pistonLanguage, input);
  };

  const handleShare = () => {
    const currentFile = files[activeFile];
    const shareableContent = `Language: ${currentFile.language}\n\nCode:\n${currentFile.content}`;
    navigator.clipboard.writeText(shareableContent);
    alert("Code copied to clipboard!");
  };

  return (
    <div className="flex flex-col h-screen bg-zinc-900 text-zinc-100">
      {/* Top Bar */}
      <div className="flex justify-between items-center p-4 text-white bg-zinc-800 border-b border-zinc-700">
        <Select onValueChange={handleLanguageChange} value={files[activeFile].language}>
          <SelectTrigger className="w-[180px] bg-zinc-900 border-zinc-700">
            <SelectValue placeholder="Select Language" />
          </SelectTrigger>
          <SelectContent className="bg-zinc-900 text-white border-zinc-700">
            {["C++", "C", "JavaScript", "TypeScript", "Python", "Java", "Go", "C#"].map((lang) => (
              <SelectItem key={lang} value={lang}>
                {lang}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <div>
          <Button
            onClick={handleRunCode}
            disabled={isLoading}
            className="bg-emerald-600 hover:bg-emerald-700 text-white"
          >
            {isLoading ? "Running..." : "Run Code"}
          </Button>
          <Button onClick={handleShare} className="ml-2 bg-zinc-700 hover:bg-zinc-600">
            Share Code
          </Button>
        </div>
      </div>

      {/* Editor & Output Panels */}
      <PanelGroup direction="vertical" className="flex-grow">
        <Panel defaultSize={60} className="h-full">
          <Tabs
            value={activeFile.toString()}
            onValueChange={(value) => setActiveFile(Number.parseInt(value))}
            className="flex flex-col h-full"
          >
            {files.map((file, index) => (
              <TabsContent
                key={index}
                value={index.toString()}
                className="flex-1 h-[calc(100vh-240px)]"
              >
                <Editor
                  height="100%"
                  language={getPistonLanguage(file.language)}
                  value={file.content}
                  onChange={(value) => {
                    const updatedFiles = [...files];
                    updatedFiles[index].content = value || "";
                    setFiles(updatedFiles);
                  }}
                  onMount={handleEditorDidMount}
                  options={{
                    minimap: { enabled: false },
                    fontSize: 14,
                    lineNumbers: "on",
                    roundedSelection: false,
                    scrollBeyondLastLine: false,
                    readOnly: false,
                    theme: "vs-dark",
                  }}
                  defaultValue="// Start coding here"
                  className="border mt-5 border-zinc-700 rounded-md"
                />
              </TabsContent>
            ))}
          </Tabs>
        </Panel>
        <PanelResizeHandle className="h-2 bg-zinc-800 hover:bg-zinc-700 transition-colors" />
        <Panel defaultSize={40}>
          <div className="flex flex-col h-full bg-zinc-900">
            <div className="flex-none p-4 border-b border-zinc-700">
              <h3 className="text-lg font-semibold mb-2 text-zinc-100">Input</h3>
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Enter input here..."
                className="w-full bg-zinc-800 border-zinc-700 text-zinc-100 placeholder:text-zinc-400"
              />
            </div>
            <div className="flex-grow p-4 bg-zinc-800 overflow-auto">
              <h3 className="text-lg font-semibold mb-2 text-zinc-100">Output</h3>
              <pre className="whitespace-pre-wrap bg-zinc-900 p-4 rounded-md border border-zinc-700 text-zinc-100 min-h-[100px]">
                {output || error || "No output yet"}
              </pre>
            </div>
          </div>
        </Panel>
      </PanelGroup>
    </div>
  );
}
