$('.comment-edit').click(() => {
    $('.comment-field').remove();
    $('.comment-buttons').remove();
    let editingForm = `
        <form action="/board/comment/write/?postID=<%= post._id %>" method="post">
            <div class="form-group">
                <textarea name="comment" class="form-control" rows="3"><%= comment.comment %></textarea>
            </div>
            <button type="submit" class="btn btn-primary">Submit</button>
        </form>`;
    $('.for-editing-comment').html(() => {
        return editingForm;
    });
});