## Tool RAG

### Introduction

Tool RAG is a small prototype designed to explore the potential of integrating “unlimited” tools into a Large Language Model (LLM) using Retrieval-Augmented Generation (RAG). This approach aims to enhance the LLM’s capabilities by dynamically retrieving the most relevant tools based on the current context and query.

### Context and Limitations

While modern LLMs come with extensive context windows, enabling them to process large amounts of data in a single interaction, they are not truly unlimited as tokens are not free (in time or money). Using a RAG process to pick the best tools to feed into an LLM can allow the capabilities of the LLM to scale without increasing tokens in the context.

### Demo

![tool-rag-gif](https://github.com/bwhiting2356/tool-rag/assets/16016903/9c21a8ba-9b79-4d90-bcce-ef4245ed4c9b)

Check out the deployed prototype [here](https://tool-rag.vercel.app/).
