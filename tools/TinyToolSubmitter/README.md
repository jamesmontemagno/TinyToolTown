# TinyToolSubmitter

A CLI tool that uses **GitHub Copilot** to analyze your repository's README and automatically prepare a submission to [Tiny Tool Town](https://tinytooltown.com).

## Install

```bash
dotnet tool install --global TinyToolSubmitter
```

## Usage

Run in the root of your repository:

```bash
tiny-tool-submit
```

The tool will:
1. Find your README (or ask you for the path)
2. Detect your GitHub remote URL
3. Use the **Copilot SDK** to analyze your README and generate a fun tagline, description, tags, and more
4. Let you review and edit the generated metadata
5. Open a pre-filled GitHub issue to submit your tool to Tiny Tool Town

### Options

```
tiny-tool-submit [path-to-repo]
  --readme <path>     Path to README file (skip auto-detection)
  --headless          Skip interactive prompts, open URL directly
  --model <name>      Copilot model to use (default: gpt-5-mini)
```
