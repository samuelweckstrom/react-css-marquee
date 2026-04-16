react-marquee-magic

- Virtualized list of items
- Callback to load more
- No. of rows


Dynamically add Refs


type Content = {
  id: string;
  content: string;
}


const { containerRef, visible, addContent } = useMagicMarquee({ content: [...], })

const handleAddContent = async (page) => {
  const url = '.../page'
  const content = await fetch(url).parseJSON()
  await addContent(replace: true | false)
}

const loadDetail = (value) => {
  setDetailView(detailView ? null : value)
}

<div containerRef>
  {visible.map(item => {
    <div key={item.id} ref={item.ref} style={item.style}>
      {item.type === 'text' && <p>{item.content}</p>}
      {item.type === 'image' && <img src={item.content} onClick={loadDetail} />}
    </div>
  })}
  {detailView && (
    <div>...</div>
  )}
  <button onClick={() => handleAddContent(page + 1)}>Add more</button>
</div>





<MagicMarquee>
  <img>
  <p>
  <video>
</MagicMarquee>
