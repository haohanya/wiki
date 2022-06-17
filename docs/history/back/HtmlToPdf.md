## 起步

这几天找了挺多使用Java将Html转为Pdf的文档，但是转换后的问题很多，例如无法显示中文，css样式不够还原

本次记录的方式可以较高的还原css2的样式，已经可以满足大部分的需求了

主要涉及的技术

https://github.com/danfickle/openhtmltopdf

https://github.com/thymeleaf/thymeleaf

主要思路就是，通过Thymeleaf去解析模板，再通过openhtmltopdf转为pdf

## 引入依赖

```xml
<properties>
    <openhtml.version>1.0.6</openhtml.version>
</properties>
<dependencies>
    <dependency>
        <groupId>com.openhtmltopdf</groupId>
        <artifactId>openhtmltopdf-core</artifactId>
        <version>${openhtml.version}</version>
    </dependency>
    <dependency>
        <!-- pdf输出所需. -->
        <groupId>com.openhtmltopdf</groupId>
        <artifactId>openhtmltopdf-pdfbox</artifactId>
        <version>${openhtml.version}</version>
    </dependency>
    <dependency>
        <!-- 仅图像输出需要. -->
        <groupId>com.openhtmltopdf</groupId>
        <artifactId>openhtmltopdf-java2d</artifactId>
        <version>${openhtml.version}</version>
    </dependency>
    <dependency>
        <!-- 可选，如果不需要从右到左或双向文本支持，请省略. -->
        <groupId>com.openhtmltopdf</groupId>
        <artifactId>openhtmltopdf-rtl-support</artifactId>
        <version>${openhtml.version}</version>
    </dependency>
    <dependency>
        <!-- 可选，如果不需要通过slf4j进行记录，请忽略. -->
        <groupId>com.openhtmltopdf</groupId>
        <artifactId>openhtmltopdf-slf4j</artifactId>
        <version>${openhtml.version}</version>
    </dependency>
    <dependency>
        <!-- 可选，如果不需要SVG支持，请忽略. -->
        <groupId>com.openhtmltopdf</groupId>
        <artifactId>openhtmltopdf-svg-support</artifactId>
        <version>${openhtml.version}</version>
    </dependency>
    <dependency>
        <!-- 可选，如果不需要数学ml支持，请忽略. -->
        <!-- 在rc 13中引入. -->
        <groupId>com.openhtmltopdf</groupId>
        <artifactId>openhtmltopdf-mathml-support</artifactId>
        <version>${openhtml.version}</version>
    </dependency>
    <!-- 模板引擎 -->
    <dependency>
        <groupId>org.thymeleaf</groupId>
        <artifactId>thymeleaf</artifactId>
        <version>3.0.11.RELEASE</version>
    </dependency>
</dependencies>

<build>
    <resources>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>true</filtering>
            <excludes>
                <exclude>font/*.ttf</exclude>
            </excludes>
        </resource>
        <resource>
            <directory>src/main/resources</directory>
            <filtering>false</filtering>
            <includes>
                <include>font/*.ttf</include>
            </includes>
        </resource>
    </resources>
</build>
```

## 基本使用

先来写一个最基本的使用方式。

```java
public static void main(String[] args) {
    try {
        PdfRendererBuilder builder = new PdfRendererBuilder();
        builder.useFastMode();
        builder.withFile(new File("E:\\template.html"));

        OutputStream os = new FileOutputStream("E:\\htmlToPdf.pdf");
        builder.toStream(os);
        builder.run();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### template.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"></meta>
    <title>Title</title>
</head>
<body>
    <div>Hello 浩瀚</div>
</body>
</html>
```

运行后访问`E:\\htmlToPdf.pdf`查看效果，发现中文显示为`#`符号。下面我们来解决中文显示问题

## 解决中文显示问题

```java
public static void main(String[] args) {
    try {
        PdfRendererBuilder builder = new PdfRendererBuilder();
        builder.useFastMode();
        builder.withFile(new File("E:\\template.html"));
        // 在此处引入ttf字体文件，注意：只能使用ttf文件
        builder.useFont(new File("E:\\font\\SimSun.ttf"), "head");
        OutputStream os = new FileOutputStream("E:\\htmlToPdf.pdf");
        builder.toStream(os);
        builder.run();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### template.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"></meta>
    <title>Title</title>
    <style>
        /* 在页面中引入字体文件,和在上面引入同一个文件即可 */
        @font-face {
            font-family: '宋体';
            src: url(font/SimSun.ttf);
            font-weight: normal;
            font-style: normal;
        }
        body {
            font-family: '宋体', Arial, sans-serif;
        }
    </style>
</head>
<body>
<div>Hello 浩瀚</div>
</body>
</html>
```

## 自动引入字体文件

在有些场景，例如我们需要同时引入多个字体文件，那么我们可以直接指定某一个目录下的所有字体

```java
public static void main(String[] args) {
    try {
        PdfRendererBuilder builder = new PdfRendererBuilder();
        builder.useFastMode();
        builder.withFile(new File("E:\\template.html"));

        // 自动字体
        Path fontDirectory = Paths.get("E:\\font");
        List<AutoFont.CSSFont> fonts = AutoFont.findFontsInDirectory(fontDirectory);
        // 列出字体的名称
        String fontFamily = AutoFont.toCSSEscapedFontFamily(fonts);
        System.out.println(fontFamily);
        AutoFont.toBuilder(builder, fonts);

         // 添加对SVG的支持
        builder.useSVGDrawer(new BatikSVGDrawer());
        
        OutputStream os = new FileOutputStream("E:\\htmlToPdf.pdf");
        builder.toStream(os);
        builder.run();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

```java
import java.io.IOException;
import java.nio.file.FileVisitOption;
import java.nio.file.FileVisitResult;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.SimpleFileVisitor;
import java.nio.file.attribute.BasicFileAttributes;
import java.util.ArrayList;
import java.util.Collections;
import java.util.EnumSet;
import java.util.List;
import java.util.Locale;
import java.util.Objects;
import java.util.Set;
import java.util.stream.Collectors;

import java.awt.Font;
import java.awt.FontFormatException;

import com.openhtmltopdf.outputdevice.helper.BaseRendererBuilder.FontStyle;
import com.openhtmltopdf.pdfboxout.PdfRendererBuilder;

/**
 * 用于列出目录中所有字体的工具。
 */
public class AutoFont {

    private AutoFont() { }

    /**
     * 返回给定目录中的字体列表。
     * 注意: 不应重复使用，因为会解析找到的每种字体以获得家族名称。
     *
     * @param validFileExtensions 字体的文件扩展名列表 - usually Collections.singletonList("ttf")
     * @param recurse 是否递归查找子目录
     * @param followLinks 是否遵循文件系统中的符号链接
     * @return 字体列表。
     */
    public static List<CSSFont> findFontsInDirectory(
        Path directory, List<String> validFileExtensions, boolean recurse, boolean followLinks) throws IOException {

        FontFileProcessor processor = new FontFileProcessor(validFileExtensions);

        int maxDepth = recurse ? Integer.MAX_VALUE : 1;
        Set<FileVisitOption> options = followLinks ? EnumSet.of(FileVisitOption.FOLLOW_LINKS) : EnumSet.noneOf(FileVisitOption.class);

        Files.walkFileTree(directory, options, maxDepth, processor);

        return processor.getFontsAdded();
    }

    /**
     * 返回给定目录中的字体列表。递归搜索目录和
     * .ttf文件的子目录。遵循符号链接.
     * NOTE: 不应重复使用，因为会解析找到的每种字体以获得家族名称。
     */
    public static List<CSSFont> findFontsInDirectory(Path directory) throws IOException {
        return findFontsInDirectory(directory, Collections.singletonList("ttf"), true, true);
    }

    /**
     * 以适当的格式获取包含添加的字体系列（已删除重复项）的字符串
     * 对于CSS字体家族属性.
     * 
     * WARNING: 基本的转义，可能并不强大.
     */
    public static String toCSSEscapedFontFamily(List<CSSFont> fontsList) {
        return fontsList.stream()
           .map(fnt -> '\'' + fnt.familyCssEscaped() + '\'')
           .distinct()
           .collect(Collectors.joining(", "));
    }

    /**
     * 将列表中的所有字体添加到构建器.
     */
    public static void toBuilder(PdfRendererBuilder builder, List<CSSFont> fonts) {
        for (CSSFont font : fonts) {
            builder.useFont(font.path.toFile(), font.family, font.weight, font.style, true);
        }
    }

    public static class CSSFont {
        public final Path path;
        public final String family;

        /**
         * WARNING: Heuristics are used to determine if a font is bold (700) or normal (400) weight.
         */
        public final int weight;

        /**
         * WARNING: Heuristics are used to determine if a font is italic or normal style.
         */
        public final FontStyle style;

        public CSSFont(Path path, String family, int weight, FontStyle style) {
            this.path = path;
            this.family = family;
            this.weight = weight;
            this.style = style;
        }

        /**
         * WARNING: Basic escaping, may not be robust to attack.
         */
        public String familyCssEscaped() {
            return this.family.replace("'", "\\'");
        }

        @Override
        public int hashCode() {
            return Objects.hash(path, family, weight, style);
        }

        @Override
        public boolean equals(Object other) {
            if (other == this) {
                return true;
            }
            
            if (other == null ||
                other.getClass() != this.getClass()) {
                return false;
            }

            CSSFont b = (CSSFont) other;

            return Objects.equals(this.path, b.path) &&
                   Objects.equals(this.family, b.family) &&
                   this.weight == b.weight &&
                   this.style == b.style;
        }
    }


    public static class FontFileProcessor extends SimpleFileVisitor<Path> {
        private final List<String> validFileExtensions;
        private final List<CSSFont> fontsAdded = new ArrayList<>();

        public FontFileProcessor(List<String> validFileExtensions) {
            this.validFileExtensions = new ArrayList<>(validFileExtensions);
        }

        public List<CSSFont> getFontsAdded() {
            return this.fontsAdded;
        }

        @Override
        public FileVisitResult visitFile(Path font, BasicFileAttributes attrs) throws IOException {
            if (attrs.isRegularFile() && isValidFont(font)) {
                try {
                    Font f = Font.createFont(Font.TRUETYPE_FONT, font.toFile());
                    
                    String family = f.getFamily();
                    // Short of parsing the font ourselves there doesn't seem to be a way
                    // of getting the font properties, so we use heuristics based on font name.
                    String name = f.getFontName(Locale.US).toLowerCase(Locale.US);
                    int weight = name.contains("bold") ? 700 : 400;
                    FontStyle style = name.contains("italic") ? FontStyle.ITALIC : FontStyle.NORMAL;

                    CSSFont fnt = new CSSFont(font, family, weight, style);

                    onValidFont(fnt);
                    fontsAdded.add(fnt);
                } catch (FontFormatException ffe) {
                    onInvalidFont(font, ffe);
                }
            }

            return FileVisitResult.CONTINUE;
        }

        protected void onValidFont(CSSFont font) {
            System.out.format("Adding font with path = '%s', name = '%s', weight = %d, style = %s%n", font.path, font.family, font.weight, font.style.name());
        }

        protected void onInvalidFont(Path font, FontFormatException ffe) {
            System.err.println("Ignoring font file with invalid font format: " + font);
            System.err.println("Exception details: ");
            ffe.printStackTrace();
        }
  
        protected boolean isValidFont(Path font) {
            return this.validFileExtensions.stream()
                     .anyMatch(ext -> font.toString().endsWith(ext));
        }
    }
}
```

## 添加对SVG的支持

```java
public static void main(String[] args) {
    try {
        PdfRendererBuilder builder = new PdfRendererBuilder();
        builder.useFastMode();
        builder.withFile(new File("E:\\template.html"));

        // 自动字体
        Path fontDirectory = Paths.get("E:\\font");
        List<AutoFont.CSSFont> fonts = AutoFont.findFontsInDirectory(fontDirectory);
        // 列出字体的名称
        String fontFamily = AutoFont.toCSSEscapedFontFamily(fonts);
        System.out.println(fontFamily);
        AutoFont.toBuilder(builder, fonts);

        // 添加对SVG的支持
        builder.useSVGDrawer(new BatikSVGDrawer());

        OutputStream os = new FileOutputStream("E:\\htmlToPdf.pdf");
        builder.toStream(os);
        builder.run();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8"></meta>
    <title>Title</title>
    <style>
        @font-face {
            font-family: '宋体';
            src: url(font/SimSun.ttf);
            font-weight: normal;
            font-style: normal;
        }
        body {
            font-family: '宋体', Arial, sans-serif;
        }
    </style>
</head>
<body>
<div>Hello 浩瀚</div>
<svg t="1612070145285" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2858" width="200" height="200"><path d="M438.6 310.8c71.84-29.14 212.49-7.61 292.95 100.14 53.08 71.09 47.73 152.29-50.59 278.66-86.15 110.72-204.53 131.99-252.75 113.69-30.49-11.57-158.94-104.44-107.36-327.57 25.66-110.99 75.41-147.74 117.75-164.92z" fill="#F42727" p-id="2859"></path><path d="M432.3 830.33c-17.08 0-32.59-2.42-45.52-7.33-56.28-21.36-96.95-84.83-116.24-137.11-24.09-65.28-27.85-152.88-9.8-228.61 21.4-89.81 69.88-154.15 136.49-181.17L404 292.8l-6.77-16.68c43.01-17.44 103.18-18.18 160.95-1.97 31.62 8.87 61.38 22.33 88.46 39.99 30 19.57 55.96 43.89 77.15 72.28 32.03 42.89 43.86 87.76 36.18 137.16-7.92 50.94-37.07 108.23-89.13 175.14-53.2 68.38-113.45 100.58-154.61 115.55-29.24 10.63-58.35 16.06-83.93 16.06z m43.01-531.94c-24.09 0-46.33 3.7-64.55 11.09-74.93 30.39-104.21 110.88-115 156.15-16.49 69.19-13.21 148.82 8.56 207.8 25.27 68.47 67.1 105.24 95.24 115.91 18.03 6.84 56.18 8.61 104.37-8.91 36.72-13.35 90.56-42.21 138.5-103.82 48.2-61.96 75.02-113.82 81.97-158.56 6.2-39.89-3.16-74.88-29.45-110.1-45.31-60.68-104.67-87.41-146.49-99.14-24.78-6.95-49.83-10.42-73.15-10.42z" fill="#E50E0E" p-id="2860"></path><path d="M526.59 250.57c-28.56-7.4-80.74-14.35-80.74-14.35s26.61 61.59 65.1 74.89c34.33 11.87-45.36 107.27-45.36 107.27s55.86 26.55 111.76-35.01c34.06 13.61 96.44 78.47 96.44 78.47 24.06-69.94-21.62-116.88-21.62-116.88 74.79 24.71 106.21-51.71 106.21-51.71-125.73 12.66-153.77 1.34-153.77 1.34s-19.17-28.77-78.02-44.02z" fill="#92D836" p-id="2861"></path><path d="M382.69 650.59c-0.69 2.11-1.39 4.21-2.08 6.32-1.51 4.58 1.75 10.27 6.44 11.34 5.08 1.16 9.72-1.53 11.34-6.44 0.69-2.11 1.39-4.21 2.08-6.32 1.51-4.58-1.75-10.27-6.44-11.34-5.07-1.15-9.72 1.53-11.34 6.44zM482.32 681.11c-0.21 1-0.53 1.95-0.78 2.93-0.37 0.98-0.34 0.95 0.1-0.08-0.21 0.46-0.43 0.92-0.66 1.37-0.47 0.9-1.03 1.74-1.58 2.59 1.15-1.78-0.64 0.7-0.97 1.05-3.31 3.51-3.74 9.6 0 13.04 3.59 3.3 9.5 3.75 13.04 0 4.22-4.48 7.34-9.95 8.64-16 1.01-4.7-1.39-10.19-6.44-11.34-4.65-1.05-10.27 1.4-11.35 6.44zM456.2 618.8l-4.17 12.63c-1.51 4.58 1.75 10.27 6.44 11.34 5.08 1.16 9.72-1.53 11.34-6.44l4.17-12.63c1.51-4.58-1.75-10.27-6.44-11.34-5.07-1.15-9.72 1.54-11.34 6.44zM363.92 588.6c-0.22 3.04-0.45 6.08-0.67 9.12-0.36 4.82 4.49 9.43 9.22 9.22 5.3-0.24 8.84-4.06 9.22-9.22 0.22-3.04 0.45-6.08 0.67-9.12 0.36-4.82-4.49-9.43-9.22-9.22-5.29 0.24-8.84 4.06-9.22 9.22zM567.28 638.86c-5.06 4.1-7.42 10.13-8.13 16.42-0.54 4.81 4.63 9.43 9.22 9.22 5.46-0.24 8.64-4.07 9.22-9.22-0.32 2.82 0.14 0.1 0.28-0.54 0.34-0.94 0.25-0.77-0.26 0.5 0.17-0.37 0.36-0.73 0.56-1.08 0.2-0.35 0.42-0.7 0.65-1.03-0.84 1.04-0.94 1.19-0.3 0.43 0.6-0.57 1.15-1.14 1.79-1.66 3.77-3.05 3.41-9.91 0-13.04-3.99-3.67-9.02-3.25-13.03 0zM431.38 531.25c-1.62 4.91-3.24 9.83-4.86 14.74-1.51 4.58 1.75 10.27 6.44 11.34 5.08 1.16 9.72-1.53 11.34-6.44 1.62-4.91 3.24-9.83 4.86-14.74 1.51-4.58-1.75-10.27-6.44-11.34-5.07-1.16-9.72 1.53-11.34 6.44zM536.49 565.94c-0.76 5.14-2.31 10.27-5.54 14.43-3.06 3.92-3.83 9.21 0 13.04 3.18 3.18 9.96 3.95 13.04 0 5.22-6.7 9.03-14.08 10.29-22.57 0.73-4.92-1.23-9.91-6.44-11.34-4.35-1.19-10.62 1.48-11.35 6.44zM349.96 502.07l-4.17 12.63c-1.51 4.58 1.75 10.27 6.44 11.34 5.08 1.16 9.72-1.53 11.34-6.44l4.17-12.63c1.51-4.58-1.75-10.27-6.44-11.34-5.07-1.16-9.72 1.53-11.34 6.44zM648.78 595.82c-2.13 3.96-4.25 7.92-6.38 11.88-2.28 4.25-1.2 10.23 3.31 12.61 4.29 2.26 10.18 1.23 12.61-3.31 2.13-3.96 4.25-7.92 6.38-11.88 2.28-4.25 1.2-10.23-3.31-12.61-4.28-2.26-10.17-1.23-12.61 3.31z" fill="#E50E0E" p-id="2862"></path><path d="M561.89 368.61c-6.01 0-11.89-2.93-15.44-8.32-5.6-8.52-3.23-19.96 5.28-25.56 19.89-13.07 31.51-28.57 34.56-46.06 5.16-29.66-15.04-57.54-15.24-57.81-6.13-8.15-4.49-19.72 3.66-25.84 8.15-6.13 19.72-4.49 25.84 3.66 1.23 1.64 30.06 40.62 22.11 86.32-4.86 27.94-21.9 51.68-50.65 70.58a18.378 18.378 0 0 1-10.12 3.03z" fill="#6FB71C" p-id="2863"></path><path d="M658.25 506.56c-4.96 0-9.78-2-13.3-5.66-16.59-17.24-61.49-60.8-91.21-78.39-33.41 31.96-66.47 40.33-89.18 41.48-27.39 1.39-46.03-7.06-48.07-8.03-5.15-2.45-8.89-7.15-10.11-12.72s0.21-11.4 3.86-15.78c0.16-0.19 16.22-19.49 31.28-42.04 20.58-30.83 24.31-45.15 24.91-50.23-20.76-8.13-40.65-26.19-59.16-53.75-13.67-20.34-21.64-38.66-21.97-39.43a18.442 18.442 0 0 1 2.22-18.45c4.01-5.3 10.56-8.04 17.15-7.16 2.44 0.32 60.09 8.05 92.88 16.54 56 14.51 83.29 39.28 93.56 50.97 12.29 2.36 53.72 7.2 160.3-3.53 6.45-0.65 12.77 2.13 16.65 7.33 3.88 5.2 4.74 12.05 2.27 18.05-0.42 1.03-10.61 25.43-32.64 45.94-14.84 13.82-36.98 27.73-66.64 29.06 0.77 1.69 1.52 3.44 2.26 5.23 9.83 23.92 18.22 62.09 2.39 108.11a18.454 18.454 0 0 1-13.47 12.02c-1.32 0.3-2.66 0.44-3.98 0.44zM549.94 381.52c2.3 0 4.62 0.43 6.84 1.32 27.09 10.83 65.56 44.67 90.52 68.44 3.81-49.63-26.19-81.2-26.55-81.57-5.93-6.09-6.93-15.45-2.42-22.66s13.36-10.4 21.44-7.73c28.35 9.37 52.15 4.58 72.78-14.62 1.46-1.36 2.84-2.74 4.16-4.13-107.32 8.36-137.67-1.02-143.05-3.19-3.57-1.44-6.32-3.53-8.38-6.76-1.36-1.82-21.52-27.57-76.99-41.93-14.34-3.71-34.52-7.37-51.98-10.22 0.63 0.96 1.27 1.93 1.92 2.9 14.49 21.43 29.41 35.27 43.15 40.02 10.46 3.62 17.81 11.34 20.7 21.76 5.12 18.44-3.91 43.69-29.27 81.88-5.33 8.03-10.74 15.62-15.65 22.25 19.82 0.3 49.07-6.63 79.1-39.69 3.58-3.95 8.57-6.07 13.68-6.07z" fill="#6FB71C" p-id="2864"></path></svg>
</body>
</html>
```

## 添加对Emoji表情的支持

对于Emoji的支持，其实就是提前将Emoji表情转为Svg的方式实现的。我们需要提前下载svg

首先我们克隆仓库：`https://github.com/twitter/twemoji`

我们需要用到这个目录下的文件`assets/svg/`

```java
try {
    EmojReplacer replacer = new EmojReplacer(
                Paths.get("E:\\work\\htmlToPdf\\src\\main\\resources\\svg"),
                "<span class=\"emoj\">",
                "</span>");
    String emoji = replacer.replaceEmoji("\uD83E\uDD17\uD83D\uDE00\uD83D\uDC9B");
    System.out.println(emoji);
} catch (IOException e) {
    e.printStackTrace();
}
```

## 集成Thymeleaf

一般数据都需要动态生成，所有我们这里需要集成thymeleaf（Freemarker也可以或者其他的也行）。

```java
public static void main(String[] args) {
    try {
        String path = PdfUtil.class.getResource("/root.htm").toExternalForm();
        String BASE = path.replace("/root.htm", "").replace("file:/", "");

        // 模拟数据
        Map<String, Object> data = new HashMap<>();
        data.put("name", "浩瀚");
        
        File file = new File(BASE + "\\template.html");
        byte[] bytes = Files.readAllBytes(file.toPath());
        // 通过模板引擎转换后得到html
        TemplateEngine engine = new TemplateEngine();
        Context ctx = new Context();
        ctx.setVariables(data);
        String html = engine.process(new String(bytes, StandardCharsets.UTF_8), ctx);

        PdfRendererBuilder builder = new PdfRendererBuilder();
        builder.useFastMode();
        builder.withHtmlContent(html, path);
        // 自动字体
        Path fontDirectory = Paths.get(BASE + "\\font");
        List<AutoFont.CSSFont> fonts = AutoFont.findFontsInDirectory(fontDirectory);
        AutoFont.toBuilder(builder, fonts);
        // 添加对SVG的支持
        builder.useSVGDrawer(new BatikSVGDrawer());
        OutputStream os = new FileOutputStream("E:\\htmlToPdf.pdf");
        builder.toStream(os);
        builder.run();
    } catch (Exception e) {
        e.printStackTrace();
    }
}
```

### template.html

```html
<!DOCTYPE html>
<html xmlns:th="http://www.thymeleaf.org">
<head>
    <meta charset="UTF-8"></meta>
    <title>Title</title>
    <style>
        @font-face {
            font-family: '宋体';
            src: url(font/SimSun.ttf);
            font-weight: normal;
            font-style: normal;
        }
        body {
            font-family: '宋体', Arial, sans-serif;
        }
    </style>
</head>
<body>
<div>Hello 浩瀚</div>
<p th:text="${name}"></p>
<svg t="1612070145285" class="icon" viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" p-id="2858" width="200" height="200"><path d="M438.6 310.8c71.84-29.14 212.49-7.61 292.95 100.14 53.08 71.09 47.73 152.29-50.59 278.66-86.15 110.72-204.53 131.99-252.75 113.69-30.49-11.57-158.94-104.44-107.36-327.57 25.66-110.99 75.41-147.74 117.75-164.92z" fill="#F42727" p-id="2859"></path><path d="M432.3 830.33c-17.08 0-32.59-2.42-45.52-7.33-56.28-21.36-96.95-84.83-116.24-137.11-24.09-65.28-27.85-152.88-9.8-228.61 21.4-89.81 69.88-154.15 136.49-181.17L404 292.8l-6.77-16.68c43.01-17.44 103.18-18.18 160.95-1.97 31.62 8.87 61.38 22.33 88.46 39.99 30 19.57 55.96 43.89 77.15 72.28 32.03 42.89 43.86 87.76 36.18 137.16-7.92 50.94-37.07 108.23-89.13 175.14-53.2 68.38-113.45 100.58-154.61 115.55-29.24 10.63-58.35 16.06-83.93 16.06z m43.01-531.94c-24.09 0-46.33 3.7-64.55 11.09-74.93 30.39-104.21 110.88-115 156.15-16.49 69.19-13.21 148.82 8.56 207.8 25.27 68.47 67.1 105.24 95.24 115.91 18.03 6.84 56.18 8.61 104.37-8.91 36.72-13.35 90.56-42.21 138.5-103.82 48.2-61.96 75.02-113.82 81.97-158.56 6.2-39.89-3.16-74.88-29.45-110.1-45.31-60.68-104.67-87.41-146.49-99.14-24.78-6.95-49.83-10.42-73.15-10.42z" fill="#E50E0E" p-id="2860"></path><path d="M526.59 250.57c-28.56-7.4-80.74-14.35-80.74-14.35s26.61 61.59 65.1 74.89c34.33 11.87-45.36 107.27-45.36 107.27s55.86 26.55 111.76-35.01c34.06 13.61 96.44 78.47 96.44 78.47 24.06-69.94-21.62-116.88-21.62-116.88 74.79 24.71 106.21-51.71 106.21-51.71-125.73 12.66-153.77 1.34-153.77 1.34s-19.17-28.77-78.02-44.02z" fill="#92D836" p-id="2861"></path><path d="M382.69 650.59c-0.69 2.11-1.39 4.21-2.08 6.32-1.51 4.58 1.75 10.27 6.44 11.34 5.08 1.16 9.72-1.53 11.34-6.44 0.69-2.11 1.39-4.21 2.08-6.32 1.51-4.58-1.75-10.27-6.44-11.34-5.07-1.15-9.72 1.53-11.34 6.44zM482.32 681.11c-0.21 1-0.53 1.95-0.78 2.93-0.37 0.98-0.34 0.95 0.1-0.08-0.21 0.46-0.43 0.92-0.66 1.37-0.47 0.9-1.03 1.74-1.58 2.59 1.15-1.78-0.64 0.7-0.97 1.05-3.31 3.51-3.74 9.6 0 13.04 3.59 3.3 9.5 3.75 13.04 0 4.22-4.48 7.34-9.95 8.64-16 1.01-4.7-1.39-10.19-6.44-11.34-4.65-1.05-10.27 1.4-11.35 6.44zM456.2 618.8l-4.17 12.63c-1.51 4.58 1.75 10.27 6.44 11.34 5.08 1.16 9.72-1.53 11.34-6.44l4.17-12.63c1.51-4.58-1.75-10.27-6.44-11.34-5.07-1.15-9.72 1.54-11.34 6.44zM363.92 588.6c-0.22 3.04-0.45 6.08-0.67 9.12-0.36 4.82 4.49 9.43 9.22 9.22 5.3-0.24 8.84-4.06 9.22-9.22 0.22-3.04 0.45-6.08 0.67-9.12 0.36-4.82-4.49-9.43-9.22-9.22-5.29 0.24-8.84 4.06-9.22 9.22zM567.28 638.86c-5.06 4.1-7.42 10.13-8.13 16.42-0.54 4.81 4.63 9.43 9.22 9.22 5.46-0.24 8.64-4.07 9.22-9.22-0.32 2.82 0.14 0.1 0.28-0.54 0.34-0.94 0.25-0.77-0.26 0.5 0.17-0.37 0.36-0.73 0.56-1.08 0.2-0.35 0.42-0.7 0.65-1.03-0.84 1.04-0.94 1.19-0.3 0.43 0.6-0.57 1.15-1.14 1.79-1.66 3.77-3.05 3.41-9.91 0-13.04-3.99-3.67-9.02-3.25-13.03 0zM431.38 531.25c-1.62 4.91-3.24 9.83-4.86 14.74-1.51 4.58 1.75 10.27 6.44 11.34 5.08 1.16 9.72-1.53 11.34-6.44 1.62-4.91 3.24-9.83 4.86-14.74 1.51-4.58-1.75-10.27-6.44-11.34-5.07-1.16-9.72 1.53-11.34 6.44zM536.49 565.94c-0.76 5.14-2.31 10.27-5.54 14.43-3.06 3.92-3.83 9.21 0 13.04 3.18 3.18 9.96 3.95 13.04 0 5.22-6.7 9.03-14.08 10.29-22.57 0.73-4.92-1.23-9.91-6.44-11.34-4.35-1.19-10.62 1.48-11.35 6.44zM349.96 502.07l-4.17 12.63c-1.51 4.58 1.75 10.27 6.44 11.34 5.08 1.16 9.72-1.53 11.34-6.44l4.17-12.63c1.51-4.58-1.75-10.27-6.44-11.34-5.07-1.16-9.72 1.53-11.34 6.44zM648.78 595.82c-2.13 3.96-4.25 7.92-6.38 11.88-2.28 4.25-1.2 10.23 3.31 12.61 4.29 2.26 10.18 1.23 12.61-3.31 2.13-3.96 4.25-7.92 6.38-11.88 2.28-4.25 1.2-10.23-3.31-12.61-4.28-2.26-10.17-1.23-12.61 3.31z" fill="#E50E0E" p-id="2862"></path><path d="M561.89 368.61c-6.01 0-11.89-2.93-15.44-8.32-5.6-8.52-3.23-19.96 5.28-25.56 19.89-13.07 31.51-28.57 34.56-46.06 5.16-29.66-15.04-57.54-15.24-57.81-6.13-8.15-4.49-19.72 3.66-25.84 8.15-6.13 19.72-4.49 25.84 3.66 1.23 1.64 30.06 40.62 22.11 86.32-4.86 27.94-21.9 51.68-50.65 70.58a18.378 18.378 0 0 1-10.12 3.03z" fill="#6FB71C" p-id="2863"></path><path d="M658.25 506.56c-4.96 0-9.78-2-13.3-5.66-16.59-17.24-61.49-60.8-91.21-78.39-33.41 31.96-66.47 40.33-89.18 41.48-27.39 1.39-46.03-7.06-48.07-8.03-5.15-2.45-8.89-7.15-10.11-12.72s0.21-11.4 3.86-15.78c0.16-0.19 16.22-19.49 31.28-42.04 20.58-30.83 24.31-45.15 24.91-50.23-20.76-8.13-40.65-26.19-59.16-53.75-13.67-20.34-21.64-38.66-21.97-39.43a18.442 18.442 0 0 1 2.22-18.45c4.01-5.3 10.56-8.04 17.15-7.16 2.44 0.32 60.09 8.05 92.88 16.54 56 14.51 83.29 39.28 93.56 50.97 12.29 2.36 53.72 7.2 160.3-3.53 6.45-0.65 12.77 2.13 16.65 7.33 3.88 5.2 4.74 12.05 2.27 18.05-0.42 1.03-10.61 25.43-32.64 45.94-14.84 13.82-36.98 27.73-66.64 29.06 0.77 1.69 1.52 3.44 2.26 5.23 9.83 23.92 18.22 62.09 2.39 108.11a18.454 18.454 0 0 1-13.47 12.02c-1.32 0.3-2.66 0.44-3.98 0.44zM549.94 381.52c2.3 0 4.62 0.43 6.84 1.32 27.09 10.83 65.56 44.67 90.52 68.44 3.81-49.63-26.19-81.2-26.55-81.57-5.93-6.09-6.93-15.45-2.42-22.66s13.36-10.4 21.44-7.73c28.35 9.37 52.15 4.58 72.78-14.62 1.46-1.36 2.84-2.74 4.16-4.13-107.32 8.36-137.67-1.02-143.05-3.19-3.57-1.44-6.32-3.53-8.38-6.76-1.36-1.82-21.52-27.57-76.99-41.93-14.34-3.71-34.52-7.37-51.98-10.22 0.63 0.96 1.27 1.93 1.92 2.9 14.49 21.43 29.41 35.27 43.15 40.02 10.46 3.62 17.81 11.34 20.7 21.76 5.12 18.44-3.91 43.69-29.27 81.88-5.33 8.03-10.74 15.62-15.65 22.25 19.82 0.3 49.07-6.63 79.1-39.69 3.58-3.95 8.57-6.07 13.68-6.07z" fill="#6FB71C" p-id="2864"></path></svg>
</body>
</html>
```
