<template>
  <div class="prose prose-blue prose-sm lg:prose-md dark:prose-invert mx-auto prose-tr:border-none">
    <h1>H1 Hello world this is a really long header that should wrap at some point but I don't know when</h1>
    <h1><a href="#">H1 Hello world</a></h1>
    <h2>H2 Hello world this is a really long header that should wrap at some point but I don't know when</h2>
    <h2><a href="#">H2 Hello world</a></h2>
    <h3>H3 Hello world this is a really long header that should wrap at some point but I don't know when</h3>
    <h3><a href="#">H3 Hello world</a></h3>
    <h4>H4 Hello world this is a really long header that should wrap at some point but I don't know when</h4>
    <h4><a href="#">H4 Hello world</a></h4>
    <h5>H5 Hello world this is a really long header that should wrap at some point but I don't know when</h5>
    <h5><a href="#">H5 Hello world</a></h5>
    <h6>H6 Hello world this is a really long header that should wrap at some point but I don't know when</h6>
    <h6><a href="#">H6 Hello world</a></h6>
    <table>
      <thead>
        <tr>
          <th>First column</th>
          <th>Second column</th>
          <th>Third column</th>
          <th>Fourth column</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            <img
              src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"
              alt=""
            >
          </td>
          <td>Content of second column</td>
          <td>Content of third column</td>
          <td>Content of fourth column</td>
        </tr>
        <tr>
          <td>Content of first column</td>
          <td>Content of second column</td>
          <td>Content of third column</td>
          <td>Content of fourth column</td>
        </tr>
        <tr>
          <td>Content of first column</td>
          <td>Content of second column</td>
          <td>Content of third column</td>
          <td>Content of fourth column</td>
        </tr>
        <tr>
          <td>Content of first column</td>
          <td>Content of second column</td>
          <td>Content of third column</td>
          <td>Content of fourth column</td>
        </tr>
        <tr>
          <td>Content of first column</td>
          <td>Content of second column</td>
          <td>Content of third column</td>
          <td>Content of fourth column</td>
        </tr>
        <tr>
          <td>Content of first column</td>
          <td>Content of second column</td>
          <td>Content of third column</td>
          <td>Content of fourth column</td>
        </tr>
        <tr>
          <td>Content of first column</td>
          <td>Content of second column</td>
          <td>Content of third column</td>
          <td>Content of fourth column</td>
        </tr>
      </tbody>
    </table>
    <div class="not-prose">
      <h1 class="bg-green-500">
        Not Prose
      </h1>
      <p>This is not prose. <a href="#">This link</a> should look like a normal link.</p>
    </div>
    <p>This has a <a href="#"><b>bold tag inside a link</b></a></p>
    <p>This has a <b><a href="#">link tag inside a bold tag</a></b></p>
    <p>This has a <a href="#"><strong>strong tag inside a link</strong></a></p>
    <p>This has a <strong><a href="#">link tag inside a strong tag</a></strong></p>
    <p>This has a <a href="#"><em>em tag inside a link</em></a></p>
    <p>This has a <em><a href="#">link tag inside a em tag</a></em></p>
    <p>This has a <a href="#"><i>italic tag inside a link</i></a></p>
    <p>This has a <i><a href="#">link tag inside a italic tag</a></i></p>
    <hr>
    <h1>Introduction to the Capabilities of Prose</h1>
    <p class="lead">
      Until now, trying to style an article, document, or blog post with Tailwind has been a tedious task that required a keen eye for typography and a lot of complex custom CSS.
    </p><p>By default, Tailwind removes all of the default browser styling from paragraphs, headings, lists and more. This ends up being really useful for building application UIs because you spend less time undoing user-agent styles, but when you <em>really are</em> just trying to style some content that came from a rich-text editor in a CMS or a markdown file, it can be surprising and unintuitive.</p><p>We get lots of complaints about it actually, with people regularly asking us things like:</p><blockquote><p>Why is Tailwind removing the default styles on my <code>h1</code> elements? How do I disable this? What do you mean I lose all the other base styles too?</p></blockquote><p>We hear you, but we're not convinced that simply disabling our base styles is what you really want. You don't want to have to remove annoying margins every time you use a <code>p</code> element in a piece of your dashboard UI. And I doubt you really want your blog posts to use the user-agent styles either — you want them to look <em>awesome</em>, not awful.</p><p>The <code>@tailwindcss/typography</code> plugin is our attempt to give you what you <em>actually</em> want, without any of the downsides of doing something stupid like disabling our base styles.</p><p>It adds a new <code>prose</code> class that you can slap on any block of vanilla HTML content and turn it into a beautiful, well-formatted document:</p><pre><code class="language-html">&lt;article class="prose"&gt;
  &lt;h1&gt;Garlic bread with cheese: What the science tells us&lt;/h1&gt;
  &lt;p&gt;
    For years parents have espoused the health benefits of eating garlic bread with cheese to their
    children, with the food earning such an iconic status in our culture that kids will often dress
    up as warm, cheesy loaf for Halloween.
  &lt;/p&gt;
  &lt;p&gt;
    But a recent study shows that the celebrated appetizer may be linked to a series of rabies cases
    springing up around the country.
  &lt;/p&gt;
  &lt;!-- ... --&gt;
&lt;/article&gt;
</code></pre><p>For more information about how to use the plugin and the features it includes, <a href="https://github.com/tailwindcss/typography/blob/master/README.md">read the documentation</a>.</p><hr><h2>What to expect from here on out</h2><p>What follows from here is just a bunch of absolute nonsense I've written to dogfood the plugin itself. It includes every sensible typographic element I could think of, like <strong>bold text</strong>, unordered lists, ordered lists, code blocks, block quotes, <em>and even italics</em>.</p><p>It's important to cover all of these use cases for a few reasons:</p><ol><li>We want everything to look good out of the box.</li><li>Really just the first reason, that's the whole point of the plugin.</li><li>Here's a third pretend reason though a list with three items looks more realistic than a list with two items.</li></ol><p>Now we're going to try out another header style.</p><h3>Typography should be easy</h3><p>So that's a header for you — with any luck if we've done our job correctly that will look pretty reasonable.</p><p>Something a wise person once told me about typography is:</p><blockquote><p>Typography is pretty important if you don't want your stuff to look like trash. Make it good then it won't be bad.</p></blockquote><p>It's probably important that images look okay here by default as well:</p><figure>
      <img
        src="https://images.unsplash.com/photo-1556740758-90de374c12ad?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=crop&amp;w=1000&amp;q=80"
        alt=""
      ><figcaption>Contrary to popular belief, Lorem Ipsum is not simply random text. It has roots in a piece of classical Latin literature from 45 BC, making it over 2000 years old.</figcaption>
    </figure><p>Now I'm going to show you an example of an unordered list to make sure that looks good, too:</p><ul><li>So here is the first item in this list.</li><li>In this example we're keeping the items short.</li><li>Later, we'll use longer, more complex list items.</li></ul><p>And that's the end of this section.</p><h2>H2 What if we stack headings?</h2><h3>H3 We should make sure that looks good, too.</h3><p>Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.</p>
    
    <h3>H3 What if we stack headings?</h3><h4>H4 We should make sure that looks good, too.</h4><p>Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.</p>

    <h4>H4 What if we stack headings?</h4><h5>H5 We should make sure that looks good, too.</h5><p>Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.</p>

    <h5>H5 What if we stack headings?</h5><h6>H6 We should make sure that looks good, too.</h6><p>Sometimes you have headings directly underneath each other. In those cases you often have to undo the top margin on the second heading because it usually looks better for the headings to be closer together than a paragraph followed by a heading should be.</p>

    <h2>H2 Eyebrow.</h2>
    <h1>H1 We should make sure that looks good, too.</h1>
    <h3>H3 Eyebrow.</h3>
    <h1>H1 We should make sure that looks good, too.</h1>
    <h4>H4 Eyebrow.</h4>
    <h1>H1 We should make sure that looks good, too.</h1>
    <h5>H5 Eyebrow.</h5>
    <h1>H1 We should make sure that looks good, too.</h1>
    <h6>H6 Eyebrow.</h6>
    <h1>H1 We should make sure that looks good, too.</h1>

    <h3>H3 Eyebrow.</h3>
    <h2>H2 We should make sure that looks good, too.</h2>
    <h4>H4 Eyebrow.</h4>
    <h2>H2 We should make sure that looks good, too.</h2>
    <h5>H5 Eyebrow.</h5>
    <h2>H2 We should make sure that looks good, too.</h2>
    <h6>H6 Eyebrow.</h6>
    <h2>H2 We should make sure that looks good, too.</h2>
    
    <h3>When a heading comes after a paragraph …</h3><p>When a heading comes after a paragraph, we need a bit more space, like I already mentioned above. Now let's see what a more complex list would look like.</p><ul><li><p><strong>I often do this thing where list items have headings.</strong></p><p>For some reason I think this looks cool which is unfortunate because it's pretty annoying to get the styles right.</p><p>I often have two or three paragraphs in these list items, too, so the hard part is getting the spacing between the paragraphs, list item heading, and separate list items to all make sense. Pretty tough honestly, you could make a strong argument that you just shouldn't write this way.</p></li><li><p><strong>Since this is a list, I need at least two items.</strong></p><p>I explained what I'm doing already in the previous list item, but a list wouldn't be a list if it only had one item, and we really want this to look realistic. That's why I've added this second list item so I actually have something to look at when writing the styles.</p></li><li><p><strong>It's not a bad idea to add a third item either.</strong></p><p>I think it probably would've been fine to just use two items but three is definitely not worse, and since I seem to be having no trouble making up arbitrary things to type, I might as well include it.</p></li></ul><p>After this sort of list I usually have a closing statement or paragraph, because it kinda looks weird jumping right to a heading.</p><h2>Code should look okay by default.</h2><p>I think most people are going to use <a href="https://highlightjs.org/">highlight.js</a> or <a href="https://prismjs.com/">Prism</a> or something if they want to style their code blocks but it wouldn't hurt to make them look <em>okay</em> out of the box, even with no syntax highlighting.</p><p>Here's what a default <code>tailwind.config.js</code> file looks like at the time of writing:</p><pre><code class="language-js">module.exports = {
  purge: [],
  theme: {
    extend: {},
  },
  variants: {},
  plugins: [],
}
</code></pre><p>Hopefully that looks good enough to you.</p><h3>What about nested lists?</h3><p>Nested lists basically always look bad which is why editors like Medium don't even let you do it, but I guess since some of you goofballs are going to do it we have to carry the burden of at least making it work.</p><ol><li><strong>Nested lists are rarely a good idea.</strong><ul><li>You might feel like you are being really "organized" or something but you are just creating a gross shape on the screen that is hard to read.</li><li>Nested navigation in UIs is a bad idea too, keep things as flat as possible.</li><li>Nesting tons of folders in your source code is also not helpful.</li></ul></li><li><strong>Since we need to have more items, here's another one.</strong><ul><li>I'm not sure if we'll bother styling more than two levels deep.</li><li>Two is already too much, three is guaranteed to be a bad idea.</li><li>If you nest four levels deep you belong in prison.</li></ul></li><li><strong>Two items isn't really a list, three is good though.</strong><ul><li>Again please don't nest lists if you want people to actually read your content.</li><li>Nobody wants to look at this.</li><li>I'm upset that we even have to bother styling this.</li></ul></li></ol><p>The most annoying thing about lists in Markdown is that <code>&lt;li&gt;</code> elements aren't given a child <code>&lt;p&gt;</code> tag unless there are multiple paragraphs in the list item. That means I have to worry about styling that annoying situation too.</p><ul><li><p><strong>For example, here's another nested list.</strong></p><p>But this time with a second paragraph.</p><ul><li>These list items won't have <code>&lt;p&gt;</code> tags</li><li>Because they are only one line each</li></ul></li><li><p><strong>But in this second top-level list item, they will.</strong></p><p>This is especially annoying because of the spacing on this paragraph.</p><ul><li><p>As you can see here, because I've added a second line, this list item now has a <code>&lt;p&gt;</code> tag.</p><p>This is the second line I'm talking about by the way.</p></li><li><p>Finally here's another list item so it's more like a list.</p></li></ul></li><li><p>A closing list item, but with no nested list, because why not?</p></li></ul><p>And finally a sentence to close off this section.</p><h2>There are other elements we need to style</h2><p>I almost forgot to mention links, like <a href="https://tailwindcss.com">this link to the Tailwind CSS website</a>. We almost made them blue but that's so yesterday, so we went with dark gray, feels edgier.</p><p>We even included table styles, check it out:</p><table><thead><tr><th>Wrestler</th><th>Origin</th><th>Finisher</th></tr></thead><tbody><tr><td>Bret "The Hitman" Hart</td><td>Calgary, AB</td><td>Sharpshooter</td></tr><tr><td>Stone Cold Steve Austin</td><td>Austin, TX</td><td>Stone Cold Stunner</td></tr><tr><td>Randy Savage</td><td>Sarasota, FL</td><td>Elbow Drop</td></tr><tr><td>Vader</td><td>Boulder, CO</td><td>Vader Bomb</td></tr><tr><td>Razor Ramon</td><td>Chuluota, FL</td><td>Razor's Edge</td></tr></tbody></table><p>We also need to make sure inline code looks good, like if I wanted to talk about <code>&lt;span&gt;</code> elements or tell you the good news about <code>@tailwindcss/typography</code>.</p><h3>Sometimes I even use <code>code</code> in headings</h3><p>Even though it's probably a bad idea, and historically I've had a hard time making it look good. This <em>"wrap the code blocks in backticks"</em> trick works pretty well though really.</p><p>Another thing I've done in the past is put a <code>code</code> tag inside of a link, like if I wanted to tell you about the <a href="https://github.com/tailwindcss/docs"><code>tailwindcss/docs</code></a> repository. I don't love that there is an underline below the backticks but it is absolutely not worth the madness it would require to avoid it.</p><h4>We haven't used an <code>h4</code> yet</h4><p>But now we have. Please don't use <code>h5</code> or <code>h6</code> in your content, Medium only supports two heading levels for a reason, you animals. I honestly considered using a <code>before</code> pseudo-element to scream at you if you use an <code>h5</code> or <code>h6</code>.</p><p>We don't style them at all out of the box because <code>h4</code> elements are already so small that they are the same size as the body copy. What are we supposed to do with an <code>h5</code>, make it <em>smaller</em> than the body copy? No thanks.</p><h3>We still need to think about stacked headings though.</h3><h4>Let's make sure we don't screw that up with <code>h4</code> elements, either.</h4><p>Phew, with any luck we have styled the headings above this text and they look pretty good.</p><p>Let's add a closing paragraph here so things end with a decently sized block of text. I can't explain why I want things to end that way but I have to assume it's because I think things will look weird or unbalanced if there is a heading too close to the end of the document.</p><p>What I've written here is probably long enough, but adding this final sentence can't hurt.</p>
  </div>
  <div>
    <h1 style="margin-bottom: 2rem;">
      Prose Custom Variants - Complete Test Suite
    </h1>

    <!-- Test 1: prose-headings variant -->
    <div class="test-section">
      <div class="test-title">
        Test 1: prose-headings Variant
      </div>
      <span class="variant-label">prose-headings:text-red-600</span>
      <div class="prose prose-headings:text-red-600">
        <h1>H1 Heading</h1>
        <h2>H2 Heading</h2>
        <h3>H3 Heading</h3>
        <p>Regular paragraph should not be red.</p>
      </div>
      <div class="expected">
        ✓ Expected: All headings (h1-h3) should be red, paragraph should be default color
      </div>
    </div>

    <!-- Test 2: prose-lead variant -->
    <div class="test-section">
      <div class="test-title">
        Test 2: prose-lead Variant
      </div>
      <span class="variant-label">prose-lead:text-blue-600</span>
      <div class="prose prose-lead:text-blue-600">
        <p class="lead">
          This is a lead paragraph that should be blue.
        </p>
        <p>This is a regular paragraph.</p>
      </div>
      <div class="expected">
        ✓ Expected: Lead paragraph should be blue, regular paragraph default color
      </div>
    </div>

    <!-- Test 3: Individual heading variants -->
    <div class="test-section">
      <div class="test-title">
        Test 3: Individual Heading Variants
      </div>
      <span class="variant-label">prose-h1:text-red-600 prose-h2:text-blue-600 prose-h3:text-green-600</span>
      <div class="prose prose-h1:text-red-600 prose-h2:text-blue-600 prose-h3:text-green-600">
        <h1>H1 should be red</h1>
        <h2>H2 should be blue</h2>
        <h3>H3 should be green</h3>
        <h4>H4 should be default</h4>
      </div>
      <div class="expected">
        ✓ Expected: h1 red, h2 blue, h3 green, h4 default
      </div>
    </div>

    <!-- Test 4: prose-p variant -->
    <div class="test-section">
      <div class="test-title">
        Test 4: prose-p Variant
      </div>
      <span class="variant-label">prose-p:text-teal-600 prose-p:text-lg</span>
      <div class="prose prose-p:text-teal-600 prose-p:text-lg">
        <p>This paragraph should be teal and large.</p>
        <p>This paragraph should also be teal and large.</p>
        <h2>This heading should not be affected</h2>
      </div>
      <div class="expected">
        ✓ Expected: Paragraphs teal and large, heading unaffected
      </div>
    </div>

    <!-- Test 5: prose-a variant -->
    <div class="test-section">
      <div class="test-title">
        Test 5: prose-a Variant (Link Override)
      </div>
      <span class="variant-label">prose-a:text-orange-600 prose-a:no-underline</span>
      <div class="prose prose-a:text-orange-600 prose-a:no-underline">
        <p>This is a paragraph with a <a href="#">link that should be orange without underline</a>.</p>
        <h2><a href="#">Heading link should also be orange without underline</a></h2>
      </div>
      <div class="expected">
        ✓ Expected: All links orange, no underline (overrides both general and heading link styles)
      </div>
    </div>

    <!-- Test 6: prose-blockquote variant -->
    <div class="test-section">
      <div class="test-title">
        Test 6: prose-blockquote Variant
      </div>
      <span class="variant-label">prose-blockquote:text-purple-600 prose-blockquote:border-l-purple-600</span>
      <div class="prose prose-blockquote:text-purple-600 prose-blockquote:border-l-purple-600">
        <blockquote>This blockquote should be purple with purple border.</blockquote>
        <p>Regular text should not be purple.</p>
      </div>
      <div class="expected">
        ✓ Expected: Blockquote purple with purple left border
      </div>
    </div>

    <!-- Test 7: prose-code and prose-pre variants -->
    <div class="test-section">
      <div class="test-title">
        Test 7: prose-code and prose-pre Variants
      </div>
      <span class="variant-label">prose-code:text-pink-600 prose-pre:bg-gray-900</span>
      <div class="prose prose-code:text-purple-200 prose-pre:bg-gray-900">
        <p>Inline <code>code snippet</code> should be purple 200.</p>
        <pre><code>// Code block should have dark background
  function test() {
    return true;
  }</code></pre>
      </div>
      <div class="expected">
        ✓ Expected: Inline code pink, code block with dark background
      </div>
    </div>

    <!-- Test 8: prose-ol and prose-ul variants -->
    <div class="test-section">
      <div class="test-title">
        Test 8: prose-ol and prose-ul Variants
      </div>
      <span class="variant-label">prose-ol:text-red-600 prose-ul:text-blue-600</span>
      <div class="prose prose-ol:text-red-600 prose-ul:text-blue-600">
        <ol>
          <li>Ordered list item should be red</li>
          <li>Another item</li>
        </ol>
        <ul>
          <li>Unordered list item should be blue</li>
          <li>Another item</li>
        </ul>
      </div>
      <div class="expected">
        ✓ Expected: Ordered list red, unordered list blue
      </div>
    </div>

    <!-- Test 9: prose-li variant -->
    <div class="test-section">
      <div class="test-title">
        Test 9: prose-li Variant
      </div>
      <span class="variant-label">prose-li:text-green-600 prose-li:font-bold</span>
      <div class="prose prose-li:text-green-600 prose-li:font-bold">
        <ul>
          <li>All list items should be green and bold</li>
          <li>Including this one</li>
        </ul>
        <ol>
          <li>Ordered list items too</li>
        </ol>
      </div>
      <div class="expected">
        ✓ Expected: All list items green and bold
      </div>
    </div>

    <!-- Test 10: Table variants -->
    <div class="test-section">
      <div class="test-title">
        Test 10: Table Variants
      </div>
      <span class="variant-label">prose-thead:bg-blue-600 prose-thead:text-white prose-tr:hover:bg-gray-100</span>
      <div class="prose prose-thead:bg-blue-600 prose-thead:text-white prose-tr:hover:bg-gray-100">
        <table>
          <thead>
            <tr>
              <th>Header 1</th>
              <th>Header 2</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Row 1, Cell 1</td>
              <td>Row 1, Cell 2</td>
            </tr>
            <tr>
              <td>Row 2, Cell 1</td>
              <td>Row 2, Cell 2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="expected">
        ✓ Expected: Table header blue with white text, rows highlight on hover
      </div>
    </div>

    <!-- Test 11: prose-th and prose-td variants -->
    <div class="test-section">
      <div class="test-title">
        Test 11: prose-th and prose-td Variants
      </div>
      <span class="variant-label">prose-th:text-purple-600 prose-th:font-black prose-td:text-teal-600</span>
      <div class="prose prose-th:text-purple-600 prose-th:font-black prose-td:text-teal-600">
        <table>
          <thead>
            <tr>
              <th>Purple Header</th>
              <th>Purple Header</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Teal cell</td>
              <td>Teal cell</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="expected">
        ✓ Expected: Headers purple and extra bold, cells teal
      </div>
    </div>

    <!-- Test 12: prose-tr variant with border override -->
    <div class="test-section">
      <div class="test-title">
        Test 12: prose-tr Variant (Border Override)
      </div>
      <span class="variant-label">prose-tr:border-b-0</span>
      <div class="prose prose-tr:border-b-0">
        <table>
          <tbody>
            <tr>
              <td>Row 1 - No border</td>
              <td>Cell 2</td>
            </tr>
            <tr>
              <td>Row 2 - No border</td>
              <td>Cell 2</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="expected">
        ✓ Expected: No borders between table rows (this was the original bug!)
      </div>
    </div>

    <!-- Test 13: prose-figure and prose-figcaption -->
    <div class="test-section">
      <div class="test-title">
        Test 13: prose-figure and prose-figcaption Variants
      </div>
      <span class="variant-label">prose-figure:border prose-figure:border-gray-300 prose-figcaption:text-blue-600</span>
      <div class="prose prose-figure:border prose-figure:border-gray-300 prose-figcaption:text-blue-600">
        <figure>
          <div style="width: 200px; height: 100px; background: #e1e2e3; display: flex; align-items: center; justify-content: center;">
            Image Placeholder
          </div>
          <figcaption>Figure caption should be blue</figcaption>
        </figure>
      </div>
      <div class="expected">
        ✓ Expected: Figure with border, caption in blue
      </div>
    </div>

    <!-- Test 14: prose-img and prose-svg -->
    <div class="test-section">
      <div class="test-title">
        Test 14: prose-img and prose-svg Variants
      </div>
      <span class="variant-label">prose-img:rounded-lg prose-img:shadow-lg prose-svg:w-16</span>
      <div class="prose prose-img:rounded-lg prose-img:shadow-lg prose-svg:w-16">
        <img
          src="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='100'%3E%3Crect fill='%23e1e2e3' width='200' height='100'/%3E%3C/svg%3E"
          alt="Test image"
        >
        <svg
          width="64"
          height="64"
          viewBox="0 0 64 64"
          fill="#007cba"
        >
          <circle
            cx="32"
            cy="32"
            r="28"
          />
        </svg>
      </div>
      <div class="expected">
        ✓ Expected: Image rounded with shadow, SVG sized to 4rem width
      </div>
    </div>

    <!-- Test 15: prose-hr variant -->
    <div class="test-section">
      <div class="test-title">
        Test 15: prose-hr Variant
      </div>
      <span class="variant-label">prose-hr:border-red-500 prose-hr:border-t-4</span>
      <div class="prose prose-hr:border-red-500 prose-hr:border-t-4">
        <p>Content above horizontal rule</p>
        <hr>
        <p>Content below horizontal rule</p>
      </div>
      <div class="expected">
        ✓ Expected: Thick red horizontal rule
      </div>
    </div>

    <!-- Test 16: prose-strong and prose-em -->
    <div class="test-section">
      <div class="test-title">
        Test 16: prose-strong and prose-em Variants
      </div>
      <span class="variant-label">prose-strong:text-red-600 prose-em:text-blue-600</span>
      <div class="prose prose-strong:text-red-600 prose-em:text-blue-600">
        <p>This paragraph has <strong>bold red text</strong> and <em>italic blue text</em>.</p>
      </div>
      <div class="expected">
        ✓ Expected: Bold text red, italic text blue
      </div>
    </div>

    <!-- Test 17: Multiple utilities combined -->
    <div class="test-section">
      <div class="test-title">
        Test 17: Multiple Variants Combined
      </div>
      <span class="variant-label">prose-headings:text-blue-600 prose-headings:font-black prose-p:text-gray-600 prose-a:text-teal-600</span>
      <div class="prose prose-headings:text-blue-600 prose-headings:font-black prose-p:text-gray-600 prose-a:text-teal-600">
        <h2>Blue Extra Bold Heading</h2>
        <p>Gray paragraph with a <a href="#">teal link</a>.</p>
        <h3>Another blue extra bold heading</h3>
        <p>Another gray paragraph.</p>
      </div>
      <div class="expected">
        ✓ Expected: All variants work together without conflicts
      </div>
    </div>

    <!-- Test 18: Margin override test -->
    <div class="test-section">
      <div class="test-title">
        Test 18: Margin Overrides
      </div>
      <span class="variant-label">prose-h1:mb-16 prose-p:mb-8</span>
      <div class="prose prose-h1:mb-16 prose-p:mb-8">
        <h1>Heading with large bottom margin</h1>
        <p>Paragraph with large bottom margin</p>
        <p>Another paragraph with large bottom margin</p>
      </div>
      <div class="expected">
        ✓ Expected: Large spacing between elements (overrides default prose margins)
      </div>
    </div>

    <!-- Test 19: Heading link override test -->
    <div class="test-section">
      <div class="test-title">
        Test 19: Heading Links (Should NOT be underlined)
      </div>
      <span class="variant-label">prose (default)</span>
      <div class="prose">
        <h1><a href="#">H1 Link - Should have NO underline</a></h1>
        <h2><a href="#">H2 Link - Should have NO underline</a></h2>
        <h3><a href="#">H3 Link - Should have NO underline</a></h3>
        <p>Regular paragraph with <a href="#">underlined link</a>.</p>
      </div>
      <div class="expected">
        ✓ Expected: Heading links have NO underline, paragraph links DO have underline (cascade order fix!)
      </div>
    </div>

    <!-- Test 20: Combined with regular Tailwind utilities -->
    <div class="test-section">
      <div class="test-title">
        Test 20: Prose Variants + Regular Tailwind Utilities
      </div>
      <span class="variant-label">prose prose-headings:text-purple-600 text-lg font-light</span>
      <div class="prose prose-headings:text-purple-600 text-lg font-light">
        <h2>Purple heading</h2>
        <p>This paragraph should be large and light weight (from regular Tailwind utilities)</p>
        <ul>
          <li>List items inherit the large, light font</li>
        </ul>
      </div>
      <div class="expected">
        ✓ Expected: Headings purple, all text large and light (prose variants + utilities work together)
      </div>
    </div>
  </div>
</template>