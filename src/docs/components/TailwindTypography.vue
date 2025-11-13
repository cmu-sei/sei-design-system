<template>
  <div class="prose prose-blue prose-sm lg:prose-md dark:prose-invert mx-auto">
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
  <div class="prose prose-blue prose-sm lg:prose-md dark:prose-invert mx-auto">
    <h1 id="how-this-coding-standard-is-organized">
      How this Coding Standard is Organized
    </h1><div class="toc-macro rbtoc1741016823371">
      <ul><li><a href="#HowthisCodingStandardisOrganized-Identifiers">Identifiers</a></li><li><a href="#HowthisCodingStandardisOrganized-NoncompliantCodeExamplesandCompliantSolutions">Noncompliant Code Examples and Compliant Solutions</a></li><li><a href="#HowthisCodingStandardisOrganized-CodingConventions">Coding Conventions</a></li><li><a href="#HowthisCodingStandardisOrganized-Exceptions">Exceptions</a></li><li><a href="#HowthisCodingStandardisOrganized-RiskAssessment">Risk Assessment</a></li><li><a href="#HowthisCodingStandardisOrganized-AutomatedDetection">Automated Detection</a></li><li><a href="#HowthisCodingStandardisOrganized-RelatedVulnerabilities">Related Vulnerabilities</a></li><li><a href="#HowthisCodingStandardisOrganized-RelatedGuidelines">Related Guidelines</a></li><li><a href="#HowthisCodingStandardisOrganized-CERT-CWEMappingNotes">CERT-CWE Mapping Notes</a></li><li><a href="#HowthisCodingStandardisOrganized-Bibliography">Bibliography</a></li></ul>
    </div><p>
      This coding standard is organized into 15 chapters containing rules in specific topic areas followed by four appendices. Appendix A contains the bibliography. Appendix B lists the definitions of terms used throughout the standard. Appendix C lists the undefined behaviors from the C Standard, Annex J, J.2 [ <a
        href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-ISO/IEC9899-2011"
        class=""
      >ISO/IEC 9899:2011</a> ], numbered and classified for easy reference. These numbered undefined behaviors are referenced frequently from the rules. Appendix D lists unspecified behaviors from the C Standard, Annex J, J.2 [ <a
        href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-ISO/IEC9899-2011"
        class=""
      >ISO/IEC 9899:2011</a> ]. These unspecified behaviors are occasionally referenced from the rules as well.
    </p><p>Most rules have a consistent structure. Each rule in this standard has a unique identifier, which is included in the title. The title and the introductory paragraphs define the rule and are typically followed by one or more pairs of noncompliant code examples and compliant solutions. Each rule also includes a risk assessment, related guidelines, and a bibliography (where applicable). Rules may also include a table of related vulnerabilities. The recommendations in this wiki are organized in a similar fashion.</p><h2 id="identifiers">
      <a href="#identifiers">Identifiers</a>
    </h2><p>Each rule and recommendation is given a unique identifier. These identifiers consist of three parts:</p><ul>
      <li>A three-letter mnemonic representing the section of the standard</li><li>A two-digit numeric value in the range of 00 to 99</li><li>
        A suffix that represents the associated language or platform.
        <ul>
          <li>
            "-C" for the <a
              href="https://securecoding.cert.org/confluence/display/c"
              rel="nofollow"
            >SEI CERT C Coding Standard</a>
          </li><li>
            "-CPP" for the <a
              href="https://securecoding.cert.org/confluence/display/cplusplus"
              rel="nofollow"
            >SEI CERT C++ Coding Standard</a>
          </li><li>
            "-J" for the <a
              href="https://securecoding.cert.org/confluence/display/java"
              rel="nofollow"
            >SEI CERT Oracle Coding Standard for Java</a>
          </li><li>
            "-PL" for the <a
              href="https://securecoding.cert.org/confluence/display/perl"
              rel="nofollow"
            >SEI CERT Perl Coding Standard</a>
          </li>
        </ul>
      </li>
    </ul><p>The three-letter mnemonic can be used to group similar coding practices and to indicate which category a coding practice belongs to.</p><p>
      The numeric value is used to give each coding practice a unique identifier. Numeric values in the range of 00 to 29 are reserved for recommendations, and values in the range of 30 to 99 are reserved for rules. (The values used for the <a
        href="/sei-cert-c++-coding-standard/"
        class=""
      >SEI CERT C++ Coding Standard</a> are different.)&nbsp;Rules and recommendations are frequently referenced from the guidelines in this standard by their identifier and title.
    </p><p>Here are some example identifiers with an explanation of each:</p><ul>
      <li>
        INT50-CPP Do not cast to an out-of-range enumeration value
        <ul><li>This identifier indicates a rule</li><li>“INT” stands for the Integer category</li><li>“50” is the unique identifier</li><li>“-CPP” stands for the C++ language</li></ul>
      </li><li>
        EXP00-J Do not ignore values returned by methods
        <ul><li>This identifier indicates a rule</li><li>“EXP” stands for the Expressions category</li><li>“00” is the unique identifier</li><li>“-J” stands for the Java language</li></ul>
      </li><li>
        FLP00-C. Understand the limitations of floating-point numbers
        <ul><li>This identifier indicates a recommendation</li><li>“FLP” stands for the Floating Point category</li><li>“00” is the unique identifier</li><li>“-C” stands for the C programming language</li></ul>
      </li>
    </ul><h2 id="noncompliant-code-examples-and-compliant-solutions">
      <a href="#noncompliant-code-examples-and-compliant-solutions">Noncompliant Code Examples and Compliant Solutions</a>
    </h2><p>Noncompliant code examples illustrate code that violates the guideline under discussion. It is important to note that these are only examples, and eliminating all occurrences of the example does not necessarily mean that the code being analyzed is now compliant with the guideline.</p><p>Noncompliant code examples are typically followed by compliant solutions, which show how the noncompliant code example can be recoded in a secure, compliant manner. Except where noted, noncompliant code examples should contain violations only of the guideline under discussion. Compliant solutions should comply with all of the secure coding rules but may on occasion fail to comply with a recommendation.</p><h2 id="coding-conventions">
      <a href="#coding-conventions">Coding Conventions</a>
    </h2><p>Unless otherwise specified, all code should compile on a reasonably modern compiler, when it is following compliance with the standard. For example, you can require GCC to conform to the C11 standard with the parameter <code>--std=c11</code> .</p><p>Code that is only expected to run on a particular subset of platforms should have those platforms mentioned in the code's section header, e.g.: <em>Compliant Solution (POSIX)</em> . Likewise, code that is only expected to run on more modern versions of C should indicate the oldest standard that supports them, e.g.: <em>Compliant Solution (C99)</em> .</p><p>In order to compile the code, you will need to include appropriate header files. For example, if the code invokes <code>malloc()</code> , you may need to include the <code>stdlib.h</code> header.</p><p>
      Many coding examples must lead with some variables initialized to valid values. If any code example (compliant or non-compliant) requires a local variable to be initialized with an unspecified but valid value, then that code should be wrapped inside a function that takes the variable as a function argument. Consequently, unless otherwise noted, function arguments should be assumed to point to valid values. For example, character pointers should not be NULL, but rather point to valid null-terminated byte strings. &nbsp;Checking that function arguments are valid is important, and is described in detail in recommendation <a
        href="/sei-cert-c-coding-standard/3-recommendations/rec.-13.-application-programming-interfaces-api/api00-c.-functions-should-validate-their-parameters"
        class=""
      >API00-C. Functions should validate their parameters</a> . However, the code involved with checking argument validity would be redundant across all code examples, and so function arguments in these code examples are not validated.
    </p><p>Many code examples will contain ellipsis in comments. This indicates that the comment may be replaced by arbitrary code that satisfies the comment. A comment with only ellipsis suggests that the code may do anything.</p><p>
      Proper error handling is a controversial subject, and many applications and libraries provide their own idiosyncratic error handling mechanisms. See <a
        href="/sei-cert-c-coding-standard/2-rules/rule-12.-error-handling-err/"
        class=""
      >Rule 12. Error Handling (ERR)</a> and <a
        href="/sei-cert-c-coding-standard/3-recommendations/rec.-12.-error-handling-err/"
        class=""
      >Rec. 12. Error Handling (ERR)</a> for our guidelines on handling errors. When our code detects that an error condition might have occurred, and handling that error condition is not endemic to the guideline itself, we will use the comment: <code>  /* Handle Error */ </code> . This comment implies that the error is somehow addressed, so that the code does not fall through. The code may abort, or fix the error somehow. For example:
    </p><div class="border-blue-200 dark:border-blue-800 prose-pre:bg-opacity-0 dark:prose-pre:bg-opacity-0 prose-pre:border-none dark:prose-pre:border-none relative max-w-none border rounded-sm bg-white dark:bg-black">
      <!----><div class="absolute right-2 top-2 flex gap-1">
        <div
          class="inline-block"
          data-id="sds-tooltip"
        >
          <div class="inline-block w-full">
            <div>
              <div
                class="mx-auto text-sm p-2 rounded-sm flex items-center mr-1 bg-blue-100 text-blue-700 dark:bg-blue-800 dark:text-blue-200"
                title="Compliant code"
              >
                <!----><span
                  class="iconify i-material-symbols:check-circle-outline w-4 h-4"
                  aria-hidden="true"
                  alt="Good quality icon"
                /><span class="sr-only">Compliant code</span>
              </div>
            </div>
          </div>
        </div><!----><div
          class="inline-block"
          data-id="sds-tooltip"
        >
          <div class="inline-block w-full">
            <div>
              <button
                data-id="sds-action-button"
                type="button"
                class="action-btn action-btn-ghost action-btn-gray action-btn-sm p-2"
                aria-disabled="false"
                title="Copy to clipboard"
              >
                <span
                  class="iconify i-material-symbols:file-copy w-4 h-4"
                  aria-hidden="true"
                  alt="Copy code icon"
                /><span class="sr-only">Copy to clipboard</span>
              </button>
            </div>
          </div>
        </div><div
          class="inline-block"
          data-id="sds-tooltip"
        >
          <div class="inline-block w-full">
            <div>
              <button
                data-id="sds-action-button"
                type="button"
                class="action-btn action-btn-ghost action-btn-gray action-btn-sm p-2"
                aria-disabled="false"
                title="Toggle fullscreen"
              >
                <span
                  class="iconify i-material-symbols:open-in-full w-4 h-4"
                  aria-hidden="true"
                  alt="Open fullscreen icon"
                /><span class="sr-only">Toggle fullscreen</span>
              </button>
            </div>
          </div>
        </div>
      </div><div
        data-id="content"
        class="prose prose-blue dark:prose-invert"
      >
        <pre class="language-c shiki shiki-themes github-light github-dark monokai"><code><span
          class="line"
          line="1"
        ><span class="sq6CD">char</span><span class="sC2Qs"> *</span><span class="sMOD_">str </span><span class="sC2Qs">=</span><span class="srTi1"> malloc</span><span class="sMOD_">(</span><span class="s7F3e">10</span><span class="sMOD_">);
</span></span><span
          class="line"
          line="2"
        ><span class="sC2Qs">if</span><span class="sMOD_"> (str </span><span class="sC2Qs">==</span><span class="s7F3e"> NULL</span><span class="sMOD_">) {
</span></span><span
          class="line"
          line="3"
        ><span class="s8-w5">  /* Handle Error */
</span></span><span
          class="line"
          line="4"
        ><span class="sMOD_">}
</span></span><span
          class="line"
          line="5"
        ><span emptylineplaceholder="true" /></span><span
          class="line"
          line="6"
        ><span class="s8-w5">/* ... str can not be NULL here. Work with str... */
</span></span></code></pre>
      </div>
    </div><h2 id="exceptions">
      <a href="#exceptions">Exceptions</a>
    </h2><p>Any rule or recommendation may specify a small set of exceptions detailing the circumstances under which the guideline is not necessary to ensure the safety, reliability, or security of software. Exceptions are informative only and are not required to be followed. Exceptions</p><h2 id="risk-assessment">
      <a href="#risk-assessment">Risk Assessment</a>
    </h2><p>Each guideline in the CERT C Coding Standard contains a risk assessment section that attempts to provide software developers with an indication of the potential consequences of not addressing a particular rule or recommendation in their code (along with some indication of expected remediation costs). This information may be used to prioritize the repair of rule violations by a development team. The metric is designed primarily for remediation projects. It is generally assumed that new code will be developed to be compliant with the entire coding standard and applicable recommendations.</p><p>
      Each rule and recommendation has an assigned <em>priority</em> . Priorities are assigned using a metric based on Failure Mode, Effects, and Criticality Analysis (FMECA) [ <a
        href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-IEC608122006"
        class=""
      >IEC 60812</a> ]. Three values are assigned for each rule on a scale of 1 to 3 for severity, likelihood, and remediation cost.
    </p><p><strong>Severity</strong> —How serious are the consequences of the rule being ignored?</p><table><thead><tr><th /><th /><th /></tr></thead><tbody><tr><td>Value</td><td>Meaning</td><td>Examples of Vulnerability</td></tr><tr><td>1</td><td>Low</td><td>Denial-of-service attack, abnormal termination</td></tr><tr><td>2</td><td>Medium</td><td>Data integrity violation, unintentional information disclosure</td></tr><tr><td>3</td><td>High</td><td>Run arbitrary code</td></tr></tbody></table><p>
      <strong>Likelihood</strong> —How likely is it that a <a
        href="/sei-cert-c-coding-standard/4-back-matter/bb.-definitions#BB.Definitions-securityflaw"
        class=""
      >flaw</a> introduced by violating the rule can lead to an exploitable vulnerability?
    </p><table><thead><tr><th /><th /></tr></thead><tbody><tr><td>Value</td><td>Meaning</td></tr><tr><td>1</td><td>Unlikely</td></tr><tr><td>2</td><td>Probable</td></tr><tr><td>3</td><td>Likely</td></tr></tbody></table><p><strong>Remediation Cost</strong> —How expensive is it to comply with the rule?</p><table><thead><tr><th /><th /><th /><th /></tr></thead><tbody><tr><td>Value</td><td>Meaning</td><td>Detection</td><td>Correction</td></tr><tr><td>1</td><td>High</td><td>Manual</td><td>Manual</td></tr><tr><td>2</td><td>Medium</td><td>Automatic</td><td>Manual</td></tr><tr><td>3</td><td>Low</td><td>Automatic</td><td>Automatic</td></tr></tbody></table><p>The three values are then multiplied together for each rule. This product provides a measure that can be used in prioritizing the application of the rules. The products range from 1 to 27, although only the following 10 distinct values are possible: 1, 2, 3, 4, 6, 8, 9, 12, 18, and 27. Rules and recommendations with a priority in the range of 1 to 4 are <strong>Level 3</strong> rules, 6 to 9 are <strong>Level 2</strong> , and 12 to 27 are <strong>Level 1</strong> . The following are possible interpretations of the priorities and levels.</p><p><strong>Priorities</strong> and <strong>Levels</strong></p><table><thead><tr><th /><th /><th /></tr></thead><tbody><tr><td>Level</td><td>Priorities</td><td>Possible Interpretation</td></tr><tr><td><strong>L1</strong></td><td><strong>12</strong> , <strong>18</strong> , <strong>27</strong></td><td>High severity, likely, inexpensive to repair</td></tr><tr><td><strong>L2</strong></td><td><strong>6</strong> , <strong>8</strong> , <strong>9</strong></td><td>Medium severity, probable, medium cost to repair</td></tr><tr><td><strong>L3</strong></td><td><strong>1</strong> , <strong>2</strong> , <strong>3</strong> , <strong>4</strong></td><td>Low severity, unlikely, expensive to repair</td></tr></tbody></table><p>Specific projects may begin remediation by implementing all rules at a particular level before proceeding to the lower priority rules, as shown in the following illustration:</p><p /><p>Recommendations are not compulsory and are provided for information purposes only.</p><h2 id="automated-detection">
      <a href="#automated-detection">Automated Detection</a>
    </h2><p>
      Both rules and recommendations frequently have sections that describe automated detection. These sections provide additional information on analyzers that can automatically diagnose violations of coding guidelines. Most automated analyses for the C programming language are neither sound nor complete, so the inclusion of a tool in this section typically means that the tool can diagnose some violations of this particular rule. The <a
        href="https://github.com/SEI-CERT/scvs"
        rel="nofollow"
      >Secure Coding Validation Suite</a> can be used to test the ability of analyzers to diagnose violations of rules from <a
        href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-ISO/IECTS17961-2013"
        class=""
      >ISO/IEC TS 17961:2013</a> , which is related to the rules in this standard.
    </p><p>The information in the automated detection sections on this wiki may be</p><ul><li>provided by the vendors</li><li>determined by CERT by informally evaluating the analyzer</li><li>determined by CERT by reviewing the vendor documentation</li></ul><p>Where possible, we try to reference the exact version of the tool for which the results were obtained. Because these tools evolve continuously, this information can rapidly become dated and obsolete.</p><h2 id="related-vulnerabilities">
      <a href="#related-vulnerabilities">Related Vulnerabilities</a>
    </h2><p>
      The risk assessment sections on the wiki also contain a link to search for related vulnerabilities on the CERT website. Whenever possible, CERT Vulnerability Notes are tagged with a keyword corresponding to the unique ID of the coding guideline. This search provides you with an up-to-date list of real-world vulnerabilities that have been determined to be at least partially caused by a violation of this specific guideline. These vulnerabilities are labeled as such only when the <a
        href="http://www.cert.org/vuls/"
        rel="nofollow"
      >vulnerability analysis team</a> at the CERT/CC is able to evaluate the source code and precisely determine the cause of the vulnerability. Because many vulnerability notes refer to vulnerabilities in closed-source software systems, it is not always possible to provide this additional analysis. Consequently, the related vulnerabilities field tends to be somewhat sparsely populated.
    </p><p>Related vulnerability sections are included only for specific rules in this standard, when the information is both relevant and interesting.</p><h2 id="related-guidelines">
      <a href="#related-guidelines">Related Guidelines</a>
    </h2><p>For each entry in a Related Guidelines table, CERT has determined that there is some code flaw for which there is both a violation of some condition of the CERT guideline and a condition of the external-to-CERT guideline, where that condition is violated or that condition is described as a flaw.</p><p><strong>Related Guidelines Table headings <u>definitions</u></strong></p><ul>
      <li>
        <strong>Taxonomy</strong> : A named set of coding rules, weaknesses, standards, or guidelines such as <em>Information Technology—Programming Languages, Their Environments and System Software Interfaces—C Secure Coding Rules</em> [ <a
          href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-ISO/IECTS17961-2013"
          class=""
        ><u>ISO/IEC TS 17961:2013</u></a> ]; <em>Information Technology—Programming Languages</em> <em>—Guidance to Avoiding Vulnerabilities in Programming Languages through Language Selection and Use</em> [ <a
          href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-ISO/IECTR24772-2013"
          class=""
        ><u>ISO/IEC TR 24772:2013</u></a> ]; <em>MISRA C 2012: Guidelines for the Use of the C Language in Critical Systems</em> [ <a
          href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-MISRA12"
          class=""
        ><u>MISRA C:2012</u></a> ]; and CWE IDs in MITRE’s Common Weakness Enumeration (CWE) [ <a
          href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-MITRE"
          class=""
        ><u>MITRE 2010</u></a> ].
      </li>
    </ul><ul><li><strong>Taxonomy item</strong> : A single named (and/or numbered) item in a taxonomy</li></ul><ul><li><strong>Relationship:</strong> For each entry in a Related Guidelines table, CERT has determined that there is some code flaw for which there is both a violation of some condition of the CERT guideline and a condition of the external-to-CERT guideline, where that condition is violated or that condition is described as a flaw.</li></ul><p>
      These relationships may be defined in a precise or imprecise way. For <a
        href="https://cwe.mitre.org/"
        rel="nofollow"
      ><u>Common Weakness Enumeration (CWE)</u></a> , CERT has made precise mappings between CERT C rules and CWEs, as described below. For other taxonomies of coding flaws or secure coding (such as <a
        href="https://www.misra.org.uk/"
        rel="nofollow"
      ><u>MISRA</u></a> or <a
        href="https://www.iso.org/standard/61457.html"
        rel="nofollow"
      ><u>ISO/IEC TR 24772:2013</u></a> ), so far, CERT has made only imprecise (“Unspecified Relationship”) mappings. An “Unspecified Relationship” label indicates there is some overlapping code flaw condition, but the extent is unspecified.
    </p><p>If the mapping was made using an automated process developed by CERT, and not yet verified manually, the mapping is marked at the end with “(A)”.</p><p>Precise relationships explain more about the extent to which conditions of the CERT guideline and external guideline match.</p><p>In the simplest case, the guidelines are exactly equal (the relationship is labelled “Exact”). CERT's “partial mapping” terms {“Partial overlap”, “Guideline subset of &lt;EXTERNAL_GUIDELINE&gt;”, “&lt;EXTERNAL_ GUIDELINE &gt; subset of rule”} describe relationships between the guideline items using the language of sets, where the guideline item (a CERT guideline or an &lt;EXTERNAL_ GUIDELINE&gt; entry) is a set that holds one or more conditions. By subset we mean a proper subset, that “A ⊂ B” &nbsp;means every element (meaning, every condition) in A is also in B, but there exists at least one element in B that is not in A. If a condition of a program violates a CERT rule “R” and also exhibits an &lt;EXTERNAL_ GUIDELINE&gt; “E”, that condition is in the overlap between “R” and “E”.</p><p>For each CWE that has a partial mapping to a CERT rule, we have documented the nature of what the rule and CWE have in common, what is exclusive to the rule, and what is exclusive to the CWE, in a section titled “CERT-CWE Mapping Notes”.</p><p>
      The 10 main precise relationship labels CERT uses are mostly the same as the 10 <a
        href="https://cwe.mitre.org/documents/mapping_analysis/index.html"
        rel="nofollow"
      ><u>CWE Mapping Fit relationship labels</u></a> , with 3 different labels.
    </p><table><thead><tr><th /><th /></tr></thead><tbody><tr><td><strong><u>Different but related terms:</u></strong></td><td /></tr><tr><td><strong><u>CERT term</u></strong></td><td><strong><u>MITRE term</u></strong></td></tr><tr><td>Rule subset of CWE</td><td>CWE_More_Abstract</td></tr><tr><td>CWE subset of rule</td><td>CWE_More_Specific</td></tr><tr><td>Partial overlap</td><td>Imprecise</td></tr></tbody></table><p>An 11th label "None" is specified in cases where previous mappings existed but it has been determined&nbsp; that there is no overlap of conditions.</p><p><strong>Table column <u>formats:</u></strong></p><ul><li><strong>Taxonomy</strong> : Taxonomy name (e.g., “CWE”) followed by version name that was mapped, if that is known (e.g., “CWE 2.11”, “CERT 2016”, or “MISRA”)</li><li><strong>Taxonomy item:</strong> A single named (and/or numbered) item in a taxonomy, sometimes with the full title text of the item and sometimes with a hyperlink to the item.</li></ul><ul><li><strong>Relationship:</strong> A combined entry with fields for date mapped, organization that did the mapping, and relationship (all in same cell for one mapping, separated by a colon, with one entry per line): &lt;(Optional “Prior to ”)YYYY-MM-DD: ORGANIZATION: RELATIONSHIP(Optional “(A)”)&gt;. &nbsp;Where specified by mapping day, precise mappings done by CERT use the latest published edition of a non-CERT taxonomy along with the latest published edition of the CERT standard plus changes on the CERT wiki. Precise mappings done by an external organization use the latest published edition of the CERT standard and their own latest published edition. Examples below:</li></ul><ul><li><ul><li>Example entries below, in the same cell on different lines: <code>     2017-10-31: CERT: CERT Subset of CWE    </code> <code>     2017-05-04: CWE: Exact    </code></li></ul></li></ul><ul><li><ul><li>Example entry for a different mapping, where the exact mapping date is unknown but is known to be before October 03, 2017:<br><code>      Prior to 2017-10-03: CERT: Unspecified Relationship     </code></li><li>Example entry for a different mapping that was made using an automated process and not yet manually verified:<br><code>      Prior to 2017-09-05: CERT: Unspecified Relationship (A)     </code></li></ul></li></ul><p>
      The related guidelines sections contain links to guidelines in related standards, technical specifications, and guideline collections such as <em>Information Technology—Programming Languages, Their Environments and System Software Interfaces—C Secure Coding Rules</em> [ <a
        href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-ISO/IECTS17961-2013"
        class=""
      ><u>ISO/IEC TS 17961:2013</u></a> ]; <em>Information Technology—Programming Languages</em> <em>—Guidance to Avoiding Vulnerabilities in Programming Languages through Language Selection and Use</em> [ <a
        href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-ISO/IECTR24772-2013"
        class=""
      ><u>ISO/IEC TR 24772:2013</u></a> ]; <em>MISRA C 2012: Guidelines for the Use of the C Language in Critical Systems</em> [ <a
        href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-MISRA12"
        class=""
      ><u>MISRA C:2012</u></a> ]; and CWE IDs in MITRE’s Common Weakness Enumeration (CWE) [ <a
        href="/sei-cert-c-coding-standard/4-back-matter/aa.-bibliography#AA.Bibliography-MITRE"
        class=""
      ><u>MITRE 2010</u></a> ].
    </p><p>
      You can create a unique URL to get more information on CWEs by appending the relevant ID to the end of a fixed string. For example, to find more information about CWE-192, Integer Coercion Error,” you can append 192.html to <a
        href="http://cwe.mitre.org/data/definitions/"
        rel="nofollow"
      ><u>http://cwe.mitre.org/data/definitions/</u></a> and enter the resulting URL in your browser: <a
        href="http://cwe.mitre.org/data/definitions/192.html"
        rel="nofollow"
      ><u>http://cwe.mitre.org/data/definitions/192.html</u></a> .
    </p><p>The other referenced technical specifications, technical reports, and guidelines are commercially available.</p><h2 id="cert-cwe-mapping-notes">
      <a href="#cert-cwe-mapping-notes">CERT-CWE Mapping Notes</a>
    </h2><p>CERT's “partial mapping” terms {Partial overlap, Rule subset of CWE, CWE subset of rule} describe relationships between the taxonomy items using the language of sets, where the taxonomy item (a CERT rule or a CWE weakness) is a set that holds one or more conditions. If a condition of a program violates a CERT rule “R” and also exhibits a CWE weakness “W”, that condition is in the overlap between the rule and weakness.</p><p>For each CWE that has a partial mapping to a CERT rule, in this section we document the nature of what the rule and CWE have in common, what is exclusive to the rule, and what is exclusive to the CWE. Sometimes what is exclusive or shared is simply described by set equations using taxonomy items, but other times documentation of what is shared may include function names or data types, or some prose description of shared characteristics.</p><p><strong>Notation: “Intersection(A, B) =”</strong> the right side of the equals sign defines if there is an overlap between A and B, meaning if a condition of a program exists with an overlapping area between A and B.</p><p><strong>Notation:&nbsp; “A</strong> <strong>⊂ B”</strong> means every element in A is also in B, but there exists at least one element in B that is not in A. (It means A is a “proper subset” of B.)</p><p><strong>Notation:&nbsp; “A</strong> <strong>⊄ B”</strong> means A is not a proper subset of B.</p><p><strong>Notation:&nbsp; “Intersection(A, B)</strong> <strong>= ∅”</strong> means no element in A is also in B. (It means the intersection is the empty set.)</p><p><strong>Notation:&nbsp; “A - B =”</strong> the right side of the equals sign defines what element(s), if any, exist in A that are not also in B.</p><p>No CERT C rule or recommendation is identical to any other CERT C rule or recommendation.</p><p>In this section, Independent() means all the rules listed within are independent: that is, every pair of two rules listed they have an empty intersection. Most CERT rules are designed to be independent, that is, they have no overlap. (This applies only to rules, not recommendations).</p><p>For CWE that have been identified as having at least a partial overlap with another CERT rule R <sub>1</sub> , for current mapping to CERT rule R <sub>2</sub> : In the Mapping Notes section we consider C’s possible overlap or exclusion of the CWE overlap area with R <sub>1</sub> . <strong>We also consider the relationship of R <sub>1</sub> and R <sub>2</sub> , if any.</strong> (By defining the relationship between the CERT rules that separately have at least some overlap with the CWE of interest, the mapping notes further define the conditions of overlap and/or non-overlap between the primary CWE-to-CERT-rule mapping of interest.)</p><p>Regarding partial overlap, we try to find segments of code as examples that are inseparable and exhibit both code flaws. An example of separable code:</p><p>The following line violates rules about integer overflow and floating-point overflow, but that does not mean that the rules about integer overflow and fp-overflow overlap:</p><p><code>  INT_MAX + 1 ; FLT_MAX + 1.0; </code></p><p><code>  static char x[3]; </code></p><p><code>  char* foo() { </code></p><p><code>  int x_int = (int) x; // x_int = 999 eg </code></p><p><code>  return x_int + 5; // returns 1004 , violates CWE 466 </code></p><p><code>  } </code></p><p><code>  ... </code></p><p><code>  int y_int = foo(); // violates CWE-466 </code></p><p><code>  char* y = (char*) y_int; //&nbsp; // well-defined but y may be invalid, violates INT36-C </code></p><p><code>  char c = *y; // indeterminate value, out-of-bounds read, violates CWE-119 </code></p><h2 id="bibliography">
      <a href="#bibliography">Bibliography</a>
    </h2><p>Most guidelines have a small bibliography section that lists documents and sections in those documents that provide information relevant to the guideline.</p><h2 id="attachments">
      <a href="#attachments">Attachments:</a>
    </h2>
  </div>
</template>