require 'sass'
require 'cgi'

module Sass::Script::Functions

  # Public: Create a data URI from an SVG file, optionally re-coloring
  # path fills. Includes the CSS url() wrapper.
  #
  # path  - Path to the SVG file, relative to the Sass compiler entry point.
  # color - Fill color to add to (or replace) on all <path> elements (optional).
  #
  # Returns a Sass string of the SVG data URI.

  def inline_svg_image(path, color = nil)
    assert_type path, :String
    assert_type color, :Color unless color.nil?

    svg = _read_svg_file_and_recolor_paths(path, color)

    data = CGI::escape(svg).gsub('+', '%20')
    data_uri = "url('data:image/svg+xml;charset=utf-8,#{data}')"

    Sass::Script::String.new(data_uri)
  end
  declare :inline_svg_image, [:path, :color]


  # Public: Create a Sass string from an SVG file, optionally re-coloring
  # path fills.
  #
  # path  - Path to the SVG file, relative to the Sass compiler entry point.
  # color - Fill color to add to (or replace) on all <path> elements (optional).
  #
  # Returns a Sass string of the raw SVG markup.

  def raw_svg_image(path, color = nil)
    assert_type path, :String
    assert_type color, :Color unless color.nil?

    svg = _read_svg_file_and_recolor_paths(path, color)

    Sass::Script::String.new("'#{svg}'")
  end
  declare :raw_svg_image, [:path, :color]


  private


  def _read_svg_file_and_recolor_paths(path, color)
    svg = _read_file(path.value).strip

    # This will work if no paths have fills, or all paths have fills,
    # but may not work as expected for svgs that have mixed paths with and
    # without fills.

    unless color.nil?
      if svg.include? 'fill='
        svg.gsub!(/fill=\"[^\"]*\"/, "fill=\"#{color}\"")
      else
        svg.gsub!('<path', "<path fill=\"#{color}\"")
      end
    end

    return svg
  end


  def _read_file(path)
    if File.readable?(path)
      File.open(path, 'rb') do |f|
        f.read
      end
    else
      raise Sass::SyntaxError, "File not found or cannot be read: #{path}"
    end
  end

end
